import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './WildernessView.css';

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
      <div className="interaction-container">
        <div
          className={`interaction-view wilderness-background ${className}`}
          style={{
            backgroundImage: bgStyle,
          }}
        >
          { characterImage
            && <img src={characterImage} alt={character} title={character} />
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
