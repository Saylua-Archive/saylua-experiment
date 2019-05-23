/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import EncounterScene from './EncounterScene';

import './Encounter.css';


export default class Encounter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.setState({ text: this.getInitialText() });
  }

  getInitialText() {
    return '';
  }

  getRelevantStats() {
    return [];
  }

  getTitle() {
    return '';
  }

  getInteractions() {
    return [];
  }

  getAvailableInteractions() {
    return this.getInteractions().filter(interaction => interaction.isAvailable);
  }

  afterInteraction() {}

  _runInteraction(func) {
    if (func) {
      func.call(this);
    }
    this.afterInteraction();
  }

  render() {
    return (
      <EncounterScene
        encounter={this}
        text={this.state.text}
      />
    );
  }
}
