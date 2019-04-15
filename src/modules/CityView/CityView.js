import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  render() {
    const { region, className } = this.props;
    const { character } = this.state;

    const bgStyle = `url('img/wilderness/${region.canonName}.jpg')`;
    const characterImage = character ? `img/characters/${character}.png` : '';

    return (
      <div className={`interaction-container ${className}`}>
        <div className="wilderness-background interaction-view">
          <div
            className="wilderness-background"
            style={{
              backgroundImage: bgStyle,
              filter: characterImage ? `blur(5px)` : '',
            }}
          />
          { characterImage
            && <img className="character-view" src={characterImage} alt={character} title={character} />
          }
        </div>
        <div className="interaction-content">
          <h2>{ region.name }</h2>
          <p>
            You see some people in wandering around the city. Who will you talk to?
          </p>
          <button type="button" onClick={() => this.changeCharacter('vera')} className="button">
            Vera Everly
          </button>
          <button type="button" onClick={() => this.changeCharacter('rufus')} className="button">
            Rufus Scippio
          </button>
          <button type="button" onClick={() => this.changeCharacter('luana')} className="button">
            Luana Liddic
          </button>
        </div>
      </div>
    );
  }
}

CityView.propTypes = {
  region: PropTypes.object.isRequired,
  className: PropTypes.string,
};

CityView.defaultProps = {
  className: '',
};
