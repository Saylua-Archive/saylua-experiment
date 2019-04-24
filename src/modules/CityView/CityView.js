import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CityScene from './CityScene';
import CityEncounter from '../../encounters/CityEncounter';
import VeraEncounter from '../../encounters/VeraEncounter';
import RufusEncounter from '../../encounters/RufusEncounter';
import LuanaEncounter from '../../encounters/LuanaEncounter';

import './CityView.css';

export default class CityView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: '',
    };
  }

  changeCharacter(character) {
    this.setState({ character });
  }

  generateNewEncounter() {
    this.setState({
      // TODO: find a proper key generating function.
      encounterKey: Math.random(),
    });
  }

  render() {
    const { region } = this.props;
    const { character, encounterKey } = this.state;

    let encounterComponent = CityEncounter;
    if (character === 'vera') {
      encounterComponent = VeraEncounter;
    }
    if (character === 'rufus') {
      encounterComponent = RufusEncounter;
    }
    if (character === 'luana') {
      encounterComponent = LuanaEncounter;
    }

    return React.createElement(
      encounterComponent,
      {
        key: encounterKey,
        onEventEnd: this.generateNewEncounter.bind(this),
        changeCharacter: this.changeCharacter.bind(this),
        region,
        viewComponent: CityScene,
        viewComponentProps: {
          region,
          character,
        },
      }
    );
  }
}

CityView.propTypes = {
  region: PropTypes.object.isRequired,
};
