/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import WildernessEncounters from './WildernessEncounters';
import EncounterScene from './EncounterScene';
import { randomChoice } from '../../utils/utils';

export default class Journey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      encounterStack: [],
      currentEncounter: this.newEncounter(),
    };
    this.finishEncounter = this.finishEncounter.bind(this);
  }

  updateEncounter() {
    let currentEncounter = null;
    if (this.state.currentEncounter) {
      return this.state.currentEncounter;
    }
    if (this.state.encounterStack.length > 0) {
      currentEncounter = this.state.encounterStack.pop();
    } else {
      currentEncounter = this.newEncounter();
    }
    this.setState({ currentEncounter });
    return currentEncounter;
  }

  newEncounter() {
    return randomChoice(WildernessEncounters);
  }

  finishEncounter() {
    const currentEncounter = randomChoice(WildernessEncounters);
    this.setState({ currentEncounter });
  }

  render() {
    return (
      <EncounterScene
        encounter={this.state.currentEncounter}
        finish={this.finishEncounter}
      />
    );
  }
}
