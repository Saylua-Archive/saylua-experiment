/* eslint-disable class-methods-use-this */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Encounter from './Encounter';
import { addTreat } from '../../reducers/gameReducer';
import { randomInt } from '../../utils/utils';
import { _n } from '../../models/Language/pluralize';

const TREAT_LIMIT = 10;

class VeraEncounter extends Encounter {
  getInitialText() {
    const text = this.props.treatCount < TREAT_LIMIT
      ? `Vera's holding a bag of treats. "I see you're running a little short on treats for your little ones. And I've got plenty... Here! Take a few!"`
      : `Looks like you've got enough treats. Come back if you run out!`;
    return text;
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
    return 'Vera Everly';
  }

  getInteractions() {
    const { treatCount } = this.props;
    const treatGift = randomInt(Math.min(5, TREAT_LIMIT - treatCount), 1);
    return [
      {
        type: 'treat',
        isAvailable: treatCount < TREAT_LIMIT,
        buttonText: `Thank you`,
        notNowTemplate: `It looks like you have enough treats for today.`,
        interact: () => {
          let text = `Vera hands you ${treatGift} ${_n('treat')(treatGift)}.`;
          if (treatCount + treatGift < TREAT_LIMIT) {
            text = `${text} "It looks like you could use a few more. If you want..."`;
          } else {
            text = `${text} "That should do it!"`;
          }
          this.setState({
            text,
          });
          this.props.addTreat(treatGift);
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
});

const mapDispatchToProps = {
  addTreat,
};

VeraEncounter.propTypes = {
  region: PropTypes.object.isRequired,
  treatCount: PropTypes.number.isRequired,
  addTreat: PropTypes.func.isRequired,
  onEventEnd: PropTypes.func,
  changeCharacter: PropTypes.func,
};

VeraEncounter.defaultProps = {
  changeCharacter: () => {},
  onEventEnd: () => {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VeraEncounter);
