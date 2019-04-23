/* eslint-disable class-methods-use-this */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Encounter from './Encounter';
import { addTreat } from '../reducers/gameReducer';


class VeraEncounter extends Encounter {
  getInitialText() {
    return `Rufus is playing with a coin. "Say, wanna play a little game? Tails I win, heads you do. Let's wager... five treats."`;
  }

  getCharacter() {
    return 'rufus';
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
    return 'Rufus Scippio';
  }

  getInteractions() {
    const { treatCount } = this.props;
    const treatGift = Math.random() > 0.5 ? 5 : -5;
    return [
      {
        type: 'treat',
        isAvailable: treatCount > 5,
        buttonText: `You're on!`,
        notNowTemplate: `You need five treats to play.`,
        interact: () => {
          const textText = treatGift > 0 ? 'Heads. You win!' : 'Tails. Tough luck.';
          const text = { text: textText };
          this.setState({
            text: text.text,
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
};

VeraEncounter.defaultProps = {
  onEventEnd: () => {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VeraEncounter);
