import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Encounter from './Encounter';
import { addTreat } from '../reducers/gameReducer';
import { befriendSprite } from '../reducers/spriteReducer';
import { getTrustLevel, TRUST_LEVELS } from '../gameData/spriteTrust';
import { randomChoice, capitalizeFirst } from '../helpers/utils';

import { PET_TEMPLATES, WATER_TEMPLATES, TREAT_TEMPLATES, WAIT_TEMPLATES,
  APPROACH_TEMPLATES } from '../gameData/templates/spriteTemplates';
import { CANONICAL_SPRITE_COATS, SPRITE_COATS } from '../gameData/spriteEncyclopedia';
import soulName from '../helpers/name/soulName';
import { ALL_PRONOUNS } from '../gameData/pronouns';


const addTrustAndDistance = (sprite, delta) => {
  const newSprite = Object.assign({}, sprite);
  newSprite.trust += delta.trust || 0;
  newSprite.distance += delta.distance || 0;
  return newSprite;
};

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
    grammar: randomChoice(ALL_PRONOUNS),
  };
};


class WildSpriteEncounter extends Encounter {
  constructor(props) {
    super(props);

    const { availableSpecies } = this.props.region;

    this.state = {
      sprite: generateSprite(availableSpecies),
    };
  }

  getInitialText() {
    const { sprite } = this.state;
    return `In the distance, you see a wild ${sprite.species}.`;
  }

  getRelevantStats() {
    const { sprite } = this.state;
    const { treatCount } = this.props;
    return [
      {
        name: 'Trust',
        value: sprite.trust,
      },
      {
        name: 'Treats',
        value: treatCount,
      },
    ];
  }

  getTitle() {
    const { sprite } = this.state;
    return `A wild ${sprite.species}`;
  }

  getInteractions() {
    const { treatCount } = this.props;
    const { sprite } = this.state;
    const trustLevel = getTrustLevel(sprite.trust);
    const comfortableOrAnxious = sprite.trust + sprite.distance > 0 ? 'comfortable' : 'anxious';
    const name = `the wild ${sprite.species}`;
    return [
      {
        type: 'approach',
        isAvailable: sprite.distance > 0,
        buttonText: `Approach ${name}`,
        interact: () => {
          const text = randomChoice(APPROACH_TEMPLATES[comfortableOrAnxious])(sprite);
          this.setState({
            text: text.text,
            kaomoji: text.kaomoji,
            sprite: addTrustAndDistance(sprite, {
              distance: -1,
              trust: Math.random() > 0.5 ? 0 : -1,
            }),
          });
        },
      },
      {
        type: 'wait',
        isAvailable: sprite.distance > 0,
        buttonText: `Wait...`,
        interact: () => {
          const text = randomChoice(WAIT_TEMPLATES[comfortableOrAnxious])(sprite);
          this.setState({
            text: text.text,
            kaomoji: text.kaomoji,
            sprite: addTrustAndDistance(sprite, {
              distance: Math.random() > 0.2 ? 0 : 1,
              trust: 1,
            }),
          });
        },
      },
      {
        type: 'pet',
        isAvailable: sprite.distance <= 0,
        buttonText: `Pet ${name}`,
        notNowTemplate: `${name} isn't in the mood for petting.`,
        interact: () => {
          const text = randomChoice(PET_TEMPLATES[trustLevel])(sprite);
          this.setState({
            text: text.text,
            kaomoji: text.kaomoji,
            sprite: addTrustAndDistance(sprite, { trust: 1 }),
          });
        },
      },
      {
        type: 'water',
        isAvailable: sprite.distance <= 1,
        buttonText: `Give ${name} water`,
        notNowTemplate: `${name} isn't thirsty.`,
        interact: () => {
          const text = randomChoice(WATER_TEMPLATES[trustLevel])(sprite);
          this.setState({
            text: text.text,
            kaomoji: text.kaomoji,
            sprite: addTrustAndDistance(sprite, { trust: 1 }),
          });
        },
      },
      {
        type: 'treat',
        isAvailable: sprite.distance <= 0 && treatCount > 0,
        buttonText: `Give ${name} a treat`,
        notNowTemplate: `You're out of treats.`,
        interact: () => {
          const text = randomChoice(TREAT_TEMPLATES[trustLevel])(sprite);
          this.setState({
            text: text.text,
            kaomoji: text.kaomoji,
            sprite: addTrustAndDistance(sprite, { trust: 2 }),
          });
          this.props.addTreat(-1);
        },
      },
    ];
  }

  afterInteraction() {
    const { sprite } = this.state;

    if (sprite.trust > TRUST_LEVELS.bonded && sprite.distance < 1) {
      this.props.befriendSprite(sprite);
    }

    if (sprite.trust + sprite.distance < TRUST_LEVELS.wild || sprite.distance > 6) {
      this.props.onEventEnd();
    }
  }
}

const mapStateToProps = state => ({
  treatCount: state.game.treatCount,
});

const mapDispatchToProps = {
  addTreat,
  befriendSprite,
};

WildSpriteEncounter.propTypes = {
  region: PropTypes.object.isRequired,
  treatCount: PropTypes.number.isRequired,
  addTreat: PropTypes.func.isRequired,
  befriendSprite: PropTypes.func.isRequired,
  onEventEnd: PropTypes.func,
};

WildSpriteEncounter.defaultProps = {
  onEventEnd: () => {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WildSpriteEncounter);
