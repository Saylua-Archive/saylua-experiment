import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Encounter from './Encounter';
import { getActiveSprite, interactWithSprite } from '../reducers/spriteReducer';
import { addTreat } from '../reducers/gameReducer';
import { getTrustLevel } from '../gameData/spriteTrust';
import { randomChoice } from '../helpers/utils';

import { PET_TEMPLATES, WATER_TEMPLATES, GROOM_TEMPLATES, TREAT_TEMPLATES,
  SING_TEMPLATES } from '../gameData/templates/spriteTemplates';

class MySpriteEncounter extends Encounter {
  getInitialText() {
    const { activeSprite } = this.props;
    return `${activeSprite.name} perks up as you approach.`;
  }

  getRelevantStats() {
    const { activeSprite, treatCount } = this.props;
    return [
      {
        name: 'Trust',
        value: activeSprite.trust,
      },
      {
        name: 'Treats',
        value: treatCount,
      },
    ];
  }

  getTitle() {
    const { activeSprite } = this.props;
    return activeSprite.name;
  }

  getInteractions() {
    const { activeSprite, treatCount } = this.props;
    const sprite = activeSprite;
    const trustLevel = getTrustLevel(sprite.trust);
    return [
      {
        type: 'pet',
        isAvailable: true,
        buttonText: `Pet ${sprite.name}`,
        notNowTemplate: `${sprite.name} isn't in the mood for petting.`,
        interact: () => {
          const text = randomChoice(PET_TEMPLATES[trustLevel])(sprite);
          this.setState({
            text: text.text,
            kaomoji: text.kaomoji,
          });
          this.props.interactWithSprite(sprite.name, { trust: 1 });
        },
      },
      {
        type: 'water',
        isAvailable: true,
        buttonText: `Give ${sprite.name} water`,
        notNowTemplate: `${sprite.name} isn't thirsty.`,
        interact: () => {
          const text = randomChoice(WATER_TEMPLATES[trustLevel])(sprite);
          this.setState({
            text: text.text,
            kaomoji: text.kaomoji,
          });
          this.props.interactWithSprite(sprite.name, { trust: 1 });
        },
      },
      {
        type: 'groom',
        isAvailable: true,
        buttonText: `Groom ${sprite.name}`,
        notNowTemplate: `${sprite.name} is already groomed.`,
        interact: () => {
          const text = randomChoice(GROOM_TEMPLATES[trustLevel])(sprite);
          this.setState({
            text: text.text,
            kaomoji: text.kaomoji,
          });
          this.props.interactWithSprite(sprite.name, { trust: 1 });
        },
      },
      {
        type: 'treat',
        isAvailable: treatCount > 0,
        buttonText: `Give ${sprite.name} a treat`,
        notNowTemplate: `You're out of treats.`,
        interact: () => {
          const text = randomChoice(TREAT_TEMPLATES[trustLevel])(sprite);
          this.setState({
            text: text.text,
            kaomoji: text.kaomoji,
          });
          this.props.interactWithSprite(sprite.name, { trust: 1 });
          this.props.addTreat(-1);
        },
      },
      {
        type: 'sing',
        isAvailable: true,
        buttonText: `Sing to ${sprite.name}`,
        notNowTemplate: `${sprite.name} is tired of singing.`,
        interact: () => {
          const text = randomChoice(SING_TEMPLATES[trustLevel])(sprite);
          this.setState({
            text: text.text,
            kaomoji: text.kaomoji,
          });
          this.props.interactWithSprite(sprite.name, { trust: 1 });
        },
      },
    ];
  }
}

const mapStateToProps = state => ({
  activeSprite: getActiveSprite(state),
  treatCount: state.game.treatCount,
});

const mapDispatchToProps = {
  interactWithSprite,
  addTreat,
};

MySpriteEncounter.propTypes = {
  activeSprite: PropTypes.object.isRequired,
  treatCount: PropTypes.number.isRequired,

  interactWithSprite: PropTypes.func.isRequired,
  addTreat: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MySpriteEncounter);
