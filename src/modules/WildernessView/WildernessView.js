import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import WildernessScene from './WildernessScene';
import { getActiveSprite } from '../../reducers/spriteReducer';
import WildSpriteEncounter from '../../encounters/WildSpriteEncounter';
import MySpriteEncounter from '../../encounters/MySpriteEncounter';


class WildernessView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      encounterKey: Math.random(),
    };
  }

  generateNewEncounter() {
    this.setState({
      // TODO: find a proper key generating function.
      encounterKey: Math.random(),
    });
  }

  render() {
    const { encounterKey } = this.state;
    const { region, activeSprite } = this.props;

    const encounterComponent = activeSprite.name ? MySpriteEncounter : WildSpriteEncounter;

    return React.createElement(
      encounterComponent,
      {
        key: encounterKey,
        onEventEnd: this.generateNewEncounter.bind(this),
        region,
        viewComponent: WildernessScene,
        viewComponentProps: {
          activeSprite,
          region,
        },
      }
    );
  }
}

const mapStateToProps = state => ({
  activeSprite: getActiveSprite(state),
});

WildernessView.propTypes = {
  activeSprite: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps
)(WildernessView);
