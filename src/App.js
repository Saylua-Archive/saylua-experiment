import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import soulName from './helpers/name/soulName';
import { capitalizeFirst, randomChoice } from './helpers/utils';
import './App.css';
import InteractionView from './modules/InteractionView';

import SpriteHeadshot from './sharedComponents/SpriteHeadshot/SpriteHeadshot';

import { INTERACTION_TYPES } from './gameData/spriteInteractions';
import { SHE_PRONOUNS, HE_PRONOUNS, THEY_PRONOUNS } from './textData/pronouns';
import { SPRITE_COATS } from './textData/spriteEncyclopedia';
import { PET_TEMPLATES, WATER_TEMPLATES, GROOM_TEMPLATES, TREAT_TEMPLATES, SING_TEMPLATES, TRUST_INCREASE_TEMPLATES } from './templates/templates';

import { addWildSprite, befriendWildSprite, setActiveSprite, interactWithSprite,
  clearInteractions } from './reducers/spriteReducer';
import { advanceDay, useTreat } from './reducers/gameReducer';

const CURIOUS_THRESHOLD = 2;
const FRIENDLY_THRESHOLD = 5;
const BONDED_THRESHOLD = 8;


const generateSprite = () => {
  const species = randomChoice(['arko', 'chirling', 'loxi', 'gam']);
  const color = randomChoice(SPRITE_COATS[species]);
  return {
    name: capitalizeFirst(soulName()),
    species,
    color,
    trust: 0,
    pronouns: randomChoice([SHE_PRONOUNS, HE_PRONOUNS,
      THEY_PRONOUNS]),
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    props.addWildSprite(generateSprite());
  }

  getInteractionCount(interactionType) {
    const spriteId = this.currentSprite().name;
    const { interactionCounts } = this.props;
    if (!(spriteId in interactionCounts)) return 0;
    if (!(interactionType in interactionCounts[spriteId])) return 0;
    return interactionCounts[spriteId][interactionType];
  }

  befriendWildSprite() {
    const newSprite = generateSprite();
    this.props.befriendWildSprite(newSprite);
  }

  currentTime() {
    const date = new Date();
    const { dayOffset } = this.props;
    date.setDate(date.getDate() + dayOffset);
    return date;
  }

  hasBeenADaySincePlaying() {
    const { lastPlayed } = this.props;
    const lastPlayedDate = new Date(lastPlayed);
    const now = this.currentTime();

    return now.toDateString() !== lastPlayedDate.toDateString();
  }

  currentSprite() {
    const { activeSpriteId, spritesById, wildSpriteId } = this.props;
    if (!activeSpriteId) return spritesById[wildSpriteId];
    return spritesById[activeSpriteId];
  }

  canPlay(interactionType) {
    const { maxPerDay, usesTreat } = INTERACTION_TYPES[interactionType];
    if (usesTreat && this.props.treatCount < 1) return false;
    if (!maxPerDay) return true;
    const interacted = this.getInteractionCount(interactionType);
    return interacted < maxPerDay || this.hasBeenADaySincePlaying();
  }

  interactWithSprite(interactionType) {
    const sprite = this.currentSprite();
    if (!this.canPlay(interactionType)) return;
    const { trustIncrease, usesTreat } = INTERACTION_TYPES[interactionType];

    if (this.hasBeenADaySincePlaying()) {
      this.props.clearInteractions();
    }

    if (usesTreat) {
      this.props.useTreat();
    }

    const lastPlayedTimestamp = this.currentTime().getTime();

    this.props.interactWithSprite(sprite.name, interactionType, trustIncrease,
      lastPlayedTimestamp);

    if ((sprite.trust + trustIncrease > BONDED_THRESHOLD)
        && !this.props.activeSpriteId) {
      this.befriendWildSprite();
    }
  }

  chooseTextByTrust(templates, trust) {
    const sprite = this.currentSprite();
    if (trust < CURIOUS_THRESHOLD) {
      return randomChoice(templates.wild)(sprite);
    }
    if (trust < FRIENDLY_THRESHOLD) {
      return randomChoice(templates.curious)(sprite);
    }
    if (trust < BONDED_THRESHOLD) {
      return randomChoice(templates.friendly)(sprite);
    }
    return randomChoice(templates.bonded)(sprite);
  }

  generateEventText() {
    const sprite = this.currentSprite();
    const { lastInteraction, trust } = sprite;
    const trustIncrease = lastInteraction ? INTERACTION_TYPES[lastInteraction].trustIncrease : 0;

    let eventText;
    switch (lastInteraction) {
      case 'water':
        eventText = this.chooseTextByTrust(WATER_TEMPLATES, trust);
        break;
      case 'groom':
        eventText = this.chooseTextByTrust(GROOM_TEMPLATES, trust);
        break;
      case 'treat':
        eventText = this.chooseTextByTrust(TREAT_TEMPLATES, trust);
        break;
      case 'sing':
        eventText = this.chooseTextByTrust(SING_TEMPLATES, trust);
        break;
      default:
        eventText = this.chooseTextByTrust(PET_TEMPLATES, trust);
    }

    if (trust >= BONDED_THRESHOLD && trust - trustIncrease < BONDED_THRESHOLD) {
      eventText = `${eventText} ${randomChoice(TRUST_INCREASE_TEMPLATES.bonded)(sprite)}`;
    } else if (trust >= FRIENDLY_THRESHOLD && trust - trustIncrease < FRIENDLY_THRESHOLD) {
      eventText = `${eventText} ${randomChoice(TRUST_INCREASE_TEMPLATES.friendly)(sprite)}`;
    } else if (trust >= CURIOUS_THRESHOLD && trust - trustIncrease < CURIOUS_THRESHOLD) {
      eventText = `${eventText} ${randomChoice(TRUST_INCREASE_TEMPLATES.curious)(sprite)}`;
    }

    return eventText;
  }

  render() {
    const sprite = this.currentSprite();
    if (!sprite) return null;
    const { mySpriteIds, activeSpriteId, treatCount } = this.props;
    const now = this.currentTime();
    const isWildSprite = !activeSpriteId;

    const eventText = this.generateEventText();

    const interactText = interactionType => (sprite
      && INTERACTION_TYPES[interactionType].buttonTextTemplate(sprite));


    const clickSprite = () => this.interactWithSprite('pet');

    return (
      <div className="saylua">
        <div className="sprite-list">
          <button
            type="button"
            className={`change-sprite${isWildSprite ? ' selected' : ''}`}
            onClick={() => this.props.setActiveSprite()}
          >
            ?
          </button>
          {
            mySpriteIds.map(id => (
              <button
                type="button"
                className={`change-sprite${id === activeSpriteId ? ' selected' : ''}`}
                key={id}
                onClick={() => this.props.setActiveSprite(id)}
              >
                <SpriteHeadshot sprite={this.props.spritesById[id]} />
              </button>
            ))
          }
        </div>
        <div className="interaction-container">
          <InteractionView
            className="interaction-view"
            sprite={sprite}
            hoverText={interactText('pet')}
            onClick={clickSprite}
          />
          <div className="interaction-content">
            <h2>{isWildSprite ? `A wild ${sprite.species}` : sprite.name}</h2>
            <p>
              {`Trust level: ${sprite.trust},
              Treat count: ${treatCount}`}
            </p>
            <p className="event-text">{eventText}</p>
            {
              Object.keys(INTERACTION_TYPES).map(interaction => (
                <button
                  type="button"
                  key={interaction}
                  onClick={() => {
                    this.interactWithSprite(interaction);
                  }}
                  disabled={this.canPlay(interaction) ? undefined : true}
                >
                  {interactText(interaction)}
                </button>
              ))
              }

            <p>
              {`The date is ${now.toLocaleString()}`}
            </p>
            <button type="button" onClick={this.props.advanceDay}>Go to sleep</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  spritesById: state.sprite.spritesById,
  mySpriteIds: state.sprite.mySpriteIds,
  activeSpriteId: state.sprite.activeSpriteId,
  wildSpriteId: state.sprite.wildSpriteId,
  interactionCounts: state.sprite.interactionCounts,
  lastPlayed: state.sprite.lastPlayed,

  dayOffset: state.game.dayOffset,
  treatCount: state.game.treatCount,
});

const mapDispatchToProps = {
  addWildSprite,
  befriendWildSprite,
  setActiveSprite,
  interactWithSprite,
  clearInteractions,
  advanceDay,
  useTreat,
};

App.propTypes = {
  addWildSprite: PropTypes.func.isRequired,
  befriendWildSprite: PropTypes.func.isRequired,
  setActiveSprite: PropTypes.func.isRequired,
  interactWithSprite: PropTypes.func.isRequired,
  clearInteractions: PropTypes.func.isRequired,
  advanceDay: PropTypes.func.isRequired,
  useTreat: PropTypes.func.isRequired,

  spritesById: PropTypes.object.isRequired,
  mySpriteIds: PropTypes.array.isRequired,
  activeSpriteId: PropTypes.string.isRequired,
  wildSpriteId: PropTypes.string.isRequired,
  interactionCounts: PropTypes.object.isRequired,
  lastPlayed: PropTypes.number.isRequired,

  dayOffset: PropTypes.number.isRequired,
  treatCount: PropTypes.number.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
