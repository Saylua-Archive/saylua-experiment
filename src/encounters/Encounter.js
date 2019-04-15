/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  beforeInteraction() {}

  afterInteraction() {}

  _runInteraction(func) {
    this.beforeInteraction();

    if (func) {
      func.call(this);
    }
    this.afterInteraction();
  }

  render() {
    const { viewComponent, viewComponentProps } = this.props;
    const stats = this.getRelevantStats();
    return (
      <div className="interaction-container">
        {
          React.createElement(viewComponent, {
            encounterState: this.state,
            interactions: this.getInteractions(),
            ...viewComponentProps,
          })
        }
        <div className="interaction-content">
          <h2>{this.getTitle()}</h2>

          {stats.length ? (
            <p>
              {stats.map(stat => `${stat.name}: ${stat.value} `)}
            </p>
          ) : ''}

          <p className="event-text">
            {this.state.text}
          </p>
          {this.getAvailableInteractions().map(interaction => (
            <button
              className="button"
              type="button"
              key={interaction.type}
              onClick={this._runInteraction.bind(this, interaction.interact)}
            >
              {interaction.buttonText}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

Encounter.propTypes = {
  viewComponent: PropTypes.object,
  viewComponentProps: PropTypes.object,
};

Encounter.defaultProps = {
  viewComponent: undefined,
  viewComponentProps: PropTypes.object,
};
