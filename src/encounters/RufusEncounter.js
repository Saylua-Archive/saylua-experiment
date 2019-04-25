/* eslint-disable class-methods-use-this */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Encounter from './Encounter';
import { addTreat } from '../reducers/gameReducer';

import { randomChoice } from '../helpers/utils';

const WAGER = 12;

class RufusEncounter extends Encounter {
  getInitialText() {
    const RufusIsPlaying = randomChoice([
      'Rufus is playing with a coin.',
      'Rufus is tossing a coin and catching it in his palm.',
      'Rufus is flipping a coin absentmindedly.',
    ]);
    const WannaPlay = randomChoice([
      'Say, wanna play a little game? Call it in the air.',
      'In the mood for a friendly wager? Heads or tails?',
      'Let\'s play a little game, just for treats. I\'ll flip this coin, you guess how it lands.',
    ]);
    return `${RufusIsPlaying} "${WannaPlay} Let's wager... a dozen tasty treats."`;
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
    const treatGift = Math.random() > 0.5 ? WAGER : -1 * WAGER;
    const Congrats = randomChoice([
      'Good call!',
      'Ouch, you got me!',
      'You win!',
      'Winner, winner!',
    ]);
    const Sorry = randomChoice([
      'Tough luck.',
      'That\'ll be twelve treats.',
    ]);
    return [
      {
        type: 'chooseHeads',
        isAvailable: treatCount >= WAGER,
        buttonText: `Heads!`,
        notNowTemplate: `You need five treats to play.`,
        interact: () => {
          const text = treatGift > 0 ? `"Heads. ${Congrats}"` : `"Tails. ${Sorry}"`;
          this.setState({
            text,
          });
          this.props.addTreat(treatGift);
        },
      },
      {
        type: 'chooseTails',
        isAvailable: treatCount >= WAGER,
        buttonText: `Tails!`,
        notNowTemplate: `You need five treats to play.`,
        interact: () => {
          const text = treatGift > 0 ? `"Tails. ${Congrats}"` : `"Heads. ${Sorry}"`;
          this.setState({
            text,
          });
          this.props.addTreat(treatGift);
        },
      },
      {
        type: 'return',
        isAvailable: true,
        buttonText: `Not now, Rufus`,
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
