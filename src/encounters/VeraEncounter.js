/* eslint-disable class-methods-use-this */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Encounter from './Encounter';
import { addTreat } from '../reducers/gameReducer';
import { randomInt } from '../helpers/utils';


class VeraEncounter extends Encounter {
  getInitialText() {
    return `Vera's holding a bag of treats.`;
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
    const treatGift = randomInt(5);
    return [
      {
        type: 'treat',
        isAvailable: treatCount < 30,
        buttonText: `Thank you`,
        notNowTemplate: `It looks like you have enough treats for today.`,
        interact: () => {
          const text = `Vera hands you ${treatGift} treats.`;
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
