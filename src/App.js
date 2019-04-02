import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import soulName from './helpers/name/soulName';
import { capitalizeFirst, randomChoice, randomInt } from './helpers/utils';
import './App.css';
import InteractionView from './modules/InteractionView';

import SpriteHeadshot from './sharedComponents/SpriteHeadshot/SpriteHeadshot';

import { INTERACTION_TYPES, TRUST_LEVELS } from './gameData/spriteInteractions';
import { SHE_PRONOUNS, HE_PRONOUNS, THEY_PRONOUNS } from './textData/pronouns';
import { SPRITE_COATS, CANONICAL_SPRITE_COATS } from './textData/spriteEncyclopedia';
import { TRUST_INCREASE_TEMPLATES,
  TREAT_GIFT_TEMPLATES, ENCOUNTER_TEMPLATES } from './templates/templates';

import { addWildSprite, befriendWildSprite, setActiveSprite, interactWithSprite,
  clearInteractions } from './reducers/spriteReducer';
import { advanceDay, addTreat, setEventText } from './reducers/gameReducer';


const generateSprite = () => {
  const species = randomChoice(['arko', 'chirling', 'loxi', 'gam']);
  let color = CANONICAL_SPRITE_COATS[species];
  if (Math.random() < 0.4) {
    color = randomChoice(SPRITE_COATS[species]);
  }
  return {
    name: capitalizeFirst(soulName()),
    species,
    color,
    trust: -5,
    distance: 5,
    grammar: randomChoice([SHE_PRONOUNS, HE_PRONOUNS,
      THEY_PRONOUNS]),
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.generateWildSprite();
  }

  getInteractionCount(interactionType) {
    const spriteId = this.currentSprite().name;
    const { interactionCounts } = this.props;
    if (!(spriteId in interactionCounts)) return 0;
    if (!(interactionType in interactionCounts[spriteId])) return 0;
    return interactionCounts[spriteId][interactionType];
  }

  generateWildSprite() {
    const newSprite = generateSprite();
    this.props.addWildSprite(newSprite);
    this.props.setEventText(randomChoice(ENCOUNTER_TEMPLATES)(newSprite));
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

  available(interactionType) {
    const { distance } = this.currentSprite();
    const { maxDistance, mindistance } = INTERACTION_TYPES[interactionType];
    if (distance > maxDistance) return false;
    if (distance <= mindistance) return false;
    return true;
  }

  canPlay(interactionType) {
    const { distance } = this.currentSprite();
    const { maxPerDay, usesTreat, maxDistance, mindistance } = INTERACTION_TYPES[interactionType];
    if (usesTreat && this.props.treatCount < 1) return false;
    if (distance > maxDistance) return false;
    if (distance <= mindistance) return false;
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
      this.props.addTreat(-1);
    }

    const lastPlayedTimestamp = this.currentTime().getTime();

    let treats = 0;
    if (sprite.trust > TRUST_LEVELS.bonded) {
      const chance = (1 - 1 / sprite.trust) * 0.3;
      if (Math.random() < chance) {
        treats = randomInt(1, 3);
      }
    }

    this.props.interactWithSprite(sprite.name, interactionType, treats,
      lastPlayedTimestamp);

    this.props.setEventText(
      this.generateEventText({ type: interactionType, treatIncrease: treats })
    );

    if ((sprite.trust + trustIncrease > TRUST_LEVELS.bonded)
        && !this.props.activeSpriteId) {
      this.befriendWildSprite();
    }
  }

  chooseText(templates, trust, distance) {
    const sprite = this.currentSprite();

    if (distance > 0 && trust + distance < 0) {
      return randomChoice(templates.anxious)(sprite);
    }
    if (distance > 0 && trust + distance >= 0) {
      return randomChoice(templates.comfortable)(sprite);
    }
    if (trust < TRUST_LEVELS.curious) {
      return randomChoice(templates.wild)(sprite);
    }
    if (trust < TRUST_LEVELS.friendly) {
      return randomChoice(templates.curious)(sprite);
    }
    if (trust < TRUST_LEVELS.bonded) {
      return randomChoice(templates.friendly)(sprite);
    }
    return randomChoice(templates.bonded)(sprite);
  }

  generateEventText(interaction) {
    const sprite = this.currentSprite();
    const { trust, distance } = sprite;
    const { type, treatIncrease } = interaction;
    const interactionType = INTERACTION_TYPES[type];
    const trustIncrease = interaction ? interactionType.trustIncrease : 0;
    const oldTrust = trust - trustIncrease;

    if (interactionType) {
      let eventText = this.chooseText(interactionType.templates, trust, distance);

      if (trust >= TRUST_LEVELS.bonded && oldTrust < TRUST_LEVELS.bonded) {
        eventText = `${eventText} ${randomChoice(TRUST_INCREASE_TEMPLATES.bonded)(sprite)}`;
      } else if (trust >= TRUST_LEVELS.friendly && oldTrust < TRUST_LEVELS.friendly) {
        eventText = `${eventText} ${randomChoice(TRUST_INCREASE_TEMPLATES.friendly)(sprite)}`;
      } else if (trust >= TRUST_LEVELS.curious && oldTrust < TRUST_LEVELS.curious) {
        eventText = `${eventText} ${randomChoice(TRUST_INCREASE_TEMPLATES.curious)(sprite)}`;
      }

      if (treatIncrease) {
        eventText = `${eventText} ${randomChoice(TREAT_GIFT_TEMPLATES)(sprite, treatIncrease)}`;
      }

      return eventText;
    }
    return `You spot a wild ${sprite.species} in the distance.`;
  }

  render() {
    const sprite = this.currentSprite();
    if (!sprite) return null;
    const { mySpriteIds, activeSpriteId, treatCount } = this.props;
    const now = this.currentTime();
    const isWildSprite = !activeSpriteId;

    const interactText = interactionType => (sprite
      && INTERACTION_TYPES[interactionType].buttonTextTemplate(sprite));


    const clickSprite = () => this.interactWithSprite('pet');

    let sceneTitle = '';
    if (!isWildSprite) {
      sceneTitle = sprite.name;
    } else if (sprite.trust > TRUST_LEVELS.friendly) {
      sceneTitle = `${sprite.name} the wild ${sprite.species}`;
    } else if (isWildSprite) {
      sceneTitle = `A wild ${sprite.species}`;
    }

    const { distance } = sprite;
    const availableInteractions = Object.keys(INTERACTION_TYPES).filter(
      (interactionType) => {
        const { maxDistance, mindistance } = INTERACTION_TYPES[interactionType];
        if (distance > maxDistance) return false;
        if (distance <= mindistance) return false;
        return true;
      }
    );

    return (
      <div className="saylua">
        <div className="sprite-list">
          <button
            type="button"
            className={`change-sprite${isWildSprite ? ' selected' : ''}`}
            onClick={() => this.props.setActiveSprite()}
          >
            {`?`}
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
            title={interactText('pet')}
            onClick={clickSprite}
          />
          <div className="interaction-content">
            <h2>{sceneTitle}</h2>
            <p>
              {`Trust level: ${sprite.trust},
              Treat count: ${treatCount}`}
            </p>
            <p className="event-text">{this.props.eventText}</p>
            {
              availableInteractions.map(interaction => (
                <button
                  className="button"
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

            <button className="button" type="button" onClick={this.generateWildSprite.bind(this)}>Run away</button>

            <p>
              {`The date is ${now.toLocaleString()}`}
            </p>
            <button className="button" type="button" onClick={this.props.advanceDay}>Go to sleep</button>
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
  eventText: state.game.eventText,
});

const mapDispatchToProps = {
  addWildSprite,
  befriendWildSprite,
  setActiveSprite,
  interactWithSprite,
  clearInteractions,
  advanceDay,
  addTreat,
  setEventText,
};

App.propTypes = {
  addWildSprite: PropTypes.func.isRequired,
  befriendWildSprite: PropTypes.func.isRequired,
  setActiveSprite: PropTypes.func.isRequired,
  interactWithSprite: PropTypes.func.isRequired,
  clearInteractions: PropTypes.func.isRequired,
  advanceDay: PropTypes.func.isRequired,
  addTreat: PropTypes.func.isRequired,
  setEventText: PropTypes.func.isRequired,

  spritesById: PropTypes.object.isRequired,
  mySpriteIds: PropTypes.array.isRequired,
  activeSpriteId: PropTypes.string.isRequired,
  wildSpriteId: PropTypes.string.isRequired,
  interactionCounts: PropTypes.object.isRequired,
  lastPlayed: PropTypes.number.isRequired,

  dayOffset: PropTypes.number.isRequired,
  treatCount: PropTypes.number.isRequired,
  eventText: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
