/* eslint-disable class-methods-use-this */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Encounter from './Encounter';
import { addTreat } from '../reducers/gameReducer';


class RufusEncounter extends Encounter {
  getInitialText() {
    return `Rufus is playing with a coin. "Say, wanna play a little game? Tails I win, heads you do. Let's wager... five treats."`;
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
        isAvailable: treatCount >= 5,
        buttonText: `You're on!`,
        notNowTemplate: `You need five treats to play.`,
        interact: () => {
          const text = treatGift > 0 ? 'Heads. You win!' : 'Tails. Tough luck.';
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

RufusEncounter.propTypes = {
  region: PropTypes.object.isRequired,
  treatCount: PropTypes.number.isRequired,
  addTreat: PropTypes.func.isRequired,
  onEventEnd: PropTypes.func,
  changeCharacter: PropTypes.func,
};

RufusEncounter.defaultProps = {
  changeCharacter: () => {},
  onEventEnd: () => {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RufusEncounter);
