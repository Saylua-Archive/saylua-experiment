/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EncounterScene from './EncounterScene';
import { randomChoice } from '../../utils/utils';

export default class Journey extends Component {
  constructor(props) {
    super(props);
    this.addEncounter = this.addEncounter.bind(this);
    this.finishEncounter = this.finishEncounter.bind(this);

    const start = randomChoice(this.props.startingEncounters);
    this.state = this.stateFromEncounter(start);
  }

  stateFromEncounter(encounter, initialState) {
    const state = initialState || {};
    const encounterStack = state.encounterStack || [];
    let currentEncounter = state.currentEncounter;

    if (Array.isArray(encounter)) {
      encounterStack.unshift(...encounter);
    } else {
      encounterStack.unshift(encounter);
    }
    if (!currentEncounter) {
      currentEncounter = encounterStack.shift();
    }

    return {
      ...state,
      currentEncounter,
      encounterStack,
    };
  }

  addEncounter(next) {
    this.setState(this.stateFromEncounter(next, this.state));
  }

  newEncounter() {
    return randomChoice(this.props.randomEncounters);
  }

  finishEncounter() {
    let currentEncounter = null;
    let { encounterStack } = this.state;
    if (this.state.encounterStack.length > 0) {
      currentEncounter = encounterStack.shift();
    } else {
      currentEncounter = this.newEncounter();
    }

    if (currentEncounter.outcome) {
      currentEncounter.outcome();
    }
    this.setState({ currentEncounter, encounterStack });
  }

  render() {
    return (
      <EncounterScene
        region={this.props.region}
        encounter={this.state.currentEncounter}
        addEncounter={this.addEncounter}
        finish={this.finishEncounter}
      />
    );
  }
}

Journey.propTypes = {
  startingEncounters: PropTypes.array.isRequired,
  randomEncounters: PropTypes.array.isRequired,
  region: PropTypes.object.isRequired,
};
