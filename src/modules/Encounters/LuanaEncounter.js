/* eslint-disable class-methods-use-this */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Encounter from './Encounter';
import { addTreat } from '../../reducers/gameReducer';
import { getActiveSprite } from '../../reducers/spriteReducer';

import { SPRITE_ENCYCLOPEDIA } from '../Sprite/spriteEncyclopedia';

import { generateCoat } from '../Sprite/spriteHelpers';
import { _n } from '../../utils';

const CANDIDATES = {
  common: ['gam', 'senrix', 'arko', 'chirling'],
  rare: ['eydrun', 'loxi', 'vela'],
};

const REWARD = 20;


class LuanaEncounter extends Encounter {
  constructor(props) {
    super(props);

    this.state = {
      sprite: generateCoat(CANDIDATES),
    };
  }

  getInitialText() {
    const { sprite } = this.state;
    const { color, species } = sprite;
    const entry = SPRITE_ENCYCLOPEDIA[species];
    return `Luana's jotting notes down on a clipboard. "I'm researching ${color} ${entry.grammar.plural}, but there are some things you just can't find in books. If you could introduce me to one, it would be a huge help! I can offer you twenty treats for your trouble."`;
  }

  getTitle() {
    return 'Luana Liddic';
  }

  getRelevantStats() {
    const { treatCount } = this.props;
    return [
      {
        name: 'Treats',
        value: treatCount,
      },
    ];
  }

  getInteractions() {
    const { activeSprite } = this.props;
    const { sprite } = this.state;
    return [
      {
        type: 'treat',
        isAvailable: activeSprite.species === sprite.species && activeSprite.color === sprite.color,
        buttonText: `${activeSprite.name} would be happy to help`,
        notNowTemplate: `It looks like you have enough treats for today.`,
        interact: () => {
          const text = `Luana studies ${activeSprite.name} carefully. After taking a few notes, she hands you ${REWARD} ${_n('treat')(REWARD)}.`;
          let nextGoal = generateCoat(CANDIDATES);
          while (nextGoal.species === sprite.species && nextGoal.color === sprite.color) {
            nextGoal = generateCoat(CANDIDATES);
          }
          this.setState({
            text,
            sprite: nextGoal,
          });
          this.props.addTreat(REWARD);
        },
      },
      {
        type: 'return',
        isAvailable: true,
        buttonText: `Head back to town`,
        interact: () => {
          this.props.changeCharacter('');
        },
      },
    ];
  }
}

const mapStateToProps = state => ({
  treatCount: state.game.treatCount,
  activeSprite: getActiveSprite(state),
});

const mapDispatchToProps = {
  addTreat,
};

LuanaEncounter.propTypes = {
  region: PropTypes.object.isRequired,
  treatCount: PropTypes.number.isRequired,
  addTreat: PropTypes.func.isRequired,
  onEventEnd: PropTypes.func,
  changeCharacter: PropTypes.func,
};

LuanaEncounter.defaultProps = {
  changeCharacter: () => {},
  onEventEnd: () => {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LuanaEncounter);
