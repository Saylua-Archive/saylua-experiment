/* eslint-disable class-methods-use-this */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Encounter from './Encounter';
import { addTreat } from '../reducers/gameReducer';


class CityEncounter extends Encounter {
  getInitialText() {
    return `Who would you like to talk to?`;
  }

  getTitle() {
    return 'Estanya City';
  }

  getInteractions() {
    return [
      {
        type: 'meet',
        isAvailable: true,
        buttonText: `Vera Everly`,
        notNowTemplate: `Vera isn't here right now.`,
        interact: () => {
          this.props.changeCharacter('vera');
        },
      },
      {
        type: 'meet',
        isAvailable: true,
        buttonText: `Rufus Scippio`,
        notNowTemplate: `Rufus isn't here right now.`,
        interact: () => {
          this.props.changeCharacter('rufus');
        },
      },
      {
        type: 'meet',
        isAvailable: true,
        buttonText: `Luana Liddic`,
        notNowTemplate: `Luana isn't here right now.`,
        interact: () => {
          this.props.changeCharacter('luana');
        },
      },
    ];
  }

  afterInteraction() {
  }
}

const mapStateToProps = state => ({
  treatCount: state.game.treatCount,
});

const mapDispatchToProps = {
  addTreat,
};

CityEncounter.propTypes = {
  region: PropTypes.object.isRequired,
  treatCount: PropTypes.number.isRequired,
  addTreat: PropTypes.func.isRequired,
  onEventEnd: PropTypes.func,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityEncounter);
