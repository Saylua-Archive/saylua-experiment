/* eslint-disable class-methods-use-this */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Encounter from './Encounter';
import { addTreat } from '../reducers/gameReducer';


class VeraEncounter extends Encounter {
  getInitialText() {
    return `Luana's holding a bag of treats.`;
  }

  getCharacter() {
    return 'luana';
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
    return [
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
};

VeraEncounter.defaultProps = {
  onEventEnd: () => {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VeraEncounter);
