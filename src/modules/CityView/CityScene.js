import React from 'react';
import PropTypes from 'prop-types';

import './CityScene.css';


export default function CityScene(props) {
  const { region, character } = props;

  const bgStyle = `url('img/wilderness/${region.canonName}.jpg')`;
  const characterImage = character ? `img/characters/${character}.png` : '';
  return (
    <div className="interaction-container">
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
    </div>
  );
}

CityScene.propTypes = {
  region: PropTypes.object.isRequired,
  character: PropTypes.string.isRequired,
};
