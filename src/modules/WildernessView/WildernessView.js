import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import soulName from '../../helpers/name/soulName';
import { capitalizeFirst, randomChoice } from '../../helpers/utils';

import { INTERACTION_TYPES, TRUST_LEVELS } from '../../gameData/spriteInteractions';
import { SHE_PRONOUNS, HE_PRONOUNS, THEY_PRONOUNS } from '../../gameData/pronouns';
import { SPRITE_COATS, CANONICAL_SPRITE_COATS } from '../../gameData/spriteEncyclopedia';
import { ENCOUNTER_TEMPLATES } from '../../templates/templates';

import { addWildSprite, befriendWildSprite, interactWithSprite } from '../../reducers/spriteReducer';
import { advanceDay, setEventText, setActiveRegion } from '../../reducers/gameReducer';

import './WildernessView.css';
import WildernessScene from './WildernessScene';


const generateSprite = (speciesList) => {
  const { common, rare } = speciesList;
  let species;
  if (Math.random() < 0.3) {
    species = randomChoice(rare);
  } else {
    species = randomChoice(common);
  }

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

class WildernessView extends Component {
  constructor(props) {
    super(props);
    this.generateWildSprite();
  }

  generateWildSprite() {
    const { availableSpecies } = this.props.region;
    const newSprite = generateSprite(availableSpecies);
    this.props.addWildSprite(newSprite);
    this.props.setEventText(randomChoice(ENCOUNTER_TEMPLATES)(newSprite));
  }

  befriendWildSprite() {
    const { availableSpecies } = this.props.region;
    const newSprite = generateSprite(availableSpecies);
    this.props.befriendWildSprite(newSprite);
  }

  currentSprite() {
    const { activeSpriteId, spritesById, wildSpriteId } = this.props;
    if (!activeSpriteId) return spritesById[wildSpriteId];
    return spritesById[activeSpriteId];
  }

  interactWithSprite() {
    const sprite = this.currentSprite();

    if ((sprite.trust > TRUST_LEVELS.bonded && sprite.distance < 1)
        && !this.props.activeSpriteId) {
      this.befriendWildSprite();
    }

    if (sprite.trust + sprite.distance < TRUST_LEVELS.wild || sprite.distance > 6) {
      this.generateWildSprite();
    }
  }

  render() {
    const sprite = this.currentSprite();
    if (!sprite) return null;
    const { activeSpriteId, treatCount } = this.props;
    const isWildSprite = !activeSpriteId;

    const clickSprite = sprite.distance <= 0 ? INTERACTION_TYPES.pet(sprite).interact : null;

    let sceneTitle = '';
    if (!isWildSprite) {
      sceneTitle = sprite.name;
    } else if (sprite.trust > TRUST_LEVELS.friendly) {
      sceneTitle = `${sprite.name} the wild ${sprite.species}`;
    } else if (isWildSprite) {
      sceneTitle = `A wild ${sprite.species}`;
    }

    const availableInteractions = Object.keys(INTERACTION_TYPES).filter(
      interactionType => INTERACTION_TYPES[interactionType](sprite).isAvailable
    );

    const interactionButtons = availableInteractions.map((interactionType) => {
      const interaction = INTERACTION_TYPES[interactionType](sprite);
      return (
        <button
          className="button"
          type="button"
          key={interactionType}
          onClick={() => {
            interaction.interact();
            this.interactWithSprite();
          }}
        >
          {interaction.buttonText}
        </button>
      );
    });

    const activeRegion = this.props.region;
    return (
      <div className="interaction-container">
        <WildernessScene
          className="interaction-view"
          sprite={sprite}
          kaomoji={this.props.eventText.kaomoji}
          region={activeRegion}
          title={`Pet ${sprite.name}`}
          onClick={clickSprite}
        />
        <div className="interaction-content">
          <h2>{sceneTitle}</h2>
          <p>
            {`Trust level: ${sprite.trust},
            Treat count: ${treatCount}`}
          </p>
          <p className="event-text">{this.props.eventText.text}</p>
          {interactionButtons}
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
  interactWithSprite,
  advanceDay,
  setEventText,
  setActiveRegion,
};

WildernessView.propTypes = {
  addWildSprite: PropTypes.func.isRequired,
  befriendWildSprite: PropTypes.func.isRequired,
  setEventText: PropTypes.func.isRequired,

  spritesById: PropTypes.object.isRequired,
  activeSpriteId: PropTypes.string.isRequired,
  wildSpriteId: PropTypes.string.isRequired,

  treatCount: PropTypes.number.isRequired,
  eventText: PropTypes.object.isRequired,

  region: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WildernessView);
