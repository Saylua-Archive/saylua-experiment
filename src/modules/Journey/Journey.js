/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import WildernessEncounters, { StartingEncounters } from './WildernessEncounters';
import EncounterScene from './EncounterScene';
import { randomChoice } from '../../utils/utils';

export default class Journey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      encounterStack: [],
      currentEncounter: StartingEncounters[0],
    };
    this.addEncounter = this.addEncounter.bind(this);
    this.finishEncounter = this.finishEncounter.bind(this);
  }

  updateEncounter() {
    let currentEncounter = null;
    let { encounterStack } = this.state;
    if (this.state.encounterStack.length > 0) {
      currentEncounter = encounterStack[encounterStack.length];
      encounterStack = encounterStack.slice(0, -1);
    } else {
      currentEncounter = this.newEncounter();
    }
    this.setState({ currentEncounter, encounterStack });
    return currentEncounter;
  }

  addEncounter(next) {
    const { encounterStack } = this.state;
    encounterStack.push(next);
    this.setState({ encounterStack });
  }

  newEncounter() {
    return randomChoice(WildernessEncounters);
  }

  finishEncounter() {
    let currentEncounter = null;
    let { encounterStack } = this.state;
    if (this.state.encounterStack.length > 0) {
      currentEncounter = encounterStack[encounterStack.length - 1];
      encounterStack = encounterStack.slice(0, -1);
    } else {
      currentEncounter = this.newEncounter();
    }
    this.setState({ currentEncounter, encounterStack });
  }

  render() {
    return (
      <EncounterScene
        encounter={this.state.currentEncounter}
        addEncounter={this.addEncounter}
        finish={this.finishEncounter}
      />
    );
  }
}
