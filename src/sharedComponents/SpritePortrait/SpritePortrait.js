import React from 'react';
import PropTypes from 'prop-types';

import { SPRITE_ENCYCLOPEDIA } from '../../gameData/spriteEncyclopedia';
import './SpritePortrait.css';
import CanvasImage from '../CanvasImage/CanvasImage';


const EXCITED_TRUST_THRESHOLD = 10;

export default function SpritePortrait(props) {
  const { sprite, title, onClick, className, style, overlayColor, faces } = props;
  const image = `img/sprites/${sprite.species}/${sprite.color}.png`;
  const { facesRight } = SPRITE_ENCYCLOPEDIA[sprite.species] || {};
  let flipSprite = false;
  if (faces === 'right') {
    flipSprite = !facesRight;
  } else if (faces === 'left') {
    flipSprite = facesRight;
  }
  const computedClass = `sprite-portrait ${className} ${flipSprite ? 'flipped' : ''} ${
    sprite.trust > EXCITED_TRUST_THRESHOLD ? 'sprite-is-excited' : ''}`;
  return (
    <button
      style={style}
      className={computedClass}
      type="button"
      onClick={onClick}
      disabled={!onClick}
    >
      <CanvasImage
        src={image}
        overlayColor={overlayColor}
        alt={sprite.species}
        title={title}
      />
    </button>
  );
}

SpritePortrait.propTypes = {
  sprite: PropTypes.object.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  overlayColor: PropTypes.object,
  faces: PropTypes.string,
};

SpritePortrait.defaultProps = {
  className: '',
  title: '',
  onClick: undefined,
  style: undefined,
  overlayColor: undefined,
  faces: '',
};
