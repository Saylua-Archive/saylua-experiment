/* eslint-disable class-methods-use-this */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Encounter from './Encounter';
import { addTreat } from '../reducers/gameReducer';
import { getActiveSprite } from '../reducers/spriteReducer';

import { CANONICAL_SPRITE_COATS, SPRITE_COATS, SPRITE_ENCYCLOPEDIA } from '../gameData/spriteEncyclopedia';

import { randomChoice } from '../helpers/utils';
import { _n } from '../gameData/textHelpers/helpers';

const goalSprite = () => {
  const common = ['gam', 'senrix', 'arko', 'chirling'];
  const rare = ['eydrun', 'loxi', 'vela'];
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
  const entry = SPRITE_ENCYCLOPEDIA[species];
  return {
    species,
    color,
    entry,
  };
};


class LuanaEncounter extends Encounter {
  constructor(props) {
    super(props);

    this.state = {
      sprite: goalSprite(),
    };
  }

  getInitialText() {
    const { sprite } = this.state;
    const { color, entry } = sprite;
    return `Luana's jotting notes down on a clipboard. "I'm researching ${color} ${entry.grammar.plural}, but there are some things you just can't find in books. If you could introduce me to one, it would be a huge help! I can offer you twenty treats for your trouble."`;
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

  getTitle() {
    return 'Luana Liddic';
  }

  getInteractions() {
    const { activeSprite } = this.props;
    const { sprite } = this.state;
    const REWARD = 20;
    let nextGoal = goalSprite();
    while (nextGoal.species === sprite.species && nextGoal.color === sprite.color) {
      nextGoal = goalSprite();
    }
    return [
      {
        type: 'treat',
        isAvailable: activeSprite.species === sprite.species && activeSprite.color === sprite.color,
        buttonText: `${activeSprite.name} would be happy to help`,
        notNowTemplate: `It looks like you have enough treats for today.`,
        interact: () => {
          const text = `Luana studies ${activeSprite.name} carefully. After taking a few notes, she hands you ${REWARD} ${_n('treat')(REWARD)}.`;
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
