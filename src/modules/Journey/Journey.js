import React, { Component } from 'react';
import WildernessEncounters from './WildernessEncounters';
import EncounterScene from './EncounterScene';
import { randomChoice } from '../../utils/utils';

export default class Journey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      encounterStack: [],
    };
    this.getCurrentEncounter = this.getCurrentEncounter.bind(this);
    this.finishEncounter = this.finishEncounter.bind(this);
  }

  getCurrentEncounter() {
    let currentEncounter = null;
    if (this.state.currentEncounter) {
      return this.state.currentEncounter;
    }
    if (this.state.encounterStack.length > 0) {
      currentEncounter = this.state.encounterStack.pop();
    } else {
      currentEncounter = randomChoice(WildernessEncounters);
    }
    this.setState({ currentEncounter });
    return currentEncounter;
  }

  finishEncounter() {
    const currentEncounter = randomChoice(WildernessEncounters);
    this.setState({ currentEncounter });
  }

  render() {
    return (
      <EncounterScene
        encounter={this.getCurrentEncounter()}
        finish={this.finishEncounter}
      />
    );
  }
}
