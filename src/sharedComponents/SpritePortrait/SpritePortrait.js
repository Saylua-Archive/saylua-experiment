import React from 'react';
import PropTypes from 'prop-types';

import { SPRITE_ENCYCLOPEDIA } from '../../gameData/spriteEncyclopedia';
import './SpritePortrait.css';
import CanvasImage from '../CanvasImage/CanvasImage';


const SPRITE_SIZE = 350;
const KAOMOJI_SIZE_PERCENT = 30;
const EXCITED_TRUST_THRESHOLD = 10;

export default function SpritePortrait(props) {
  const { kaomoji, sprite, title, onClick, className, style, overlayColor, faces } = props;
  const image = `img/sprites/${sprite.species}/${sprite.color}.png`;
  const { facesRight, headshotCoordinates } = SPRITE_ENCYCLOPEDIA[sprite.species] || {};
  const { y, x, size } = headshotCoordinates;

  // A value that can be added to kaomojiCoordinates.x to make the kaomoji look like it's
  // coming from the mouth.
  // const mouthOffset = facesRight ? KAOMOJI_SIZE_PERCENT / 2 : -KAOMOJI_SIZE_PERCENT / 2;
  const kaomojiCoordinates = {
    y: 100 * y / SPRITE_SIZE - KAOMOJI_SIZE_PERCENT / 2,
    x: 100 * (x + size / 2) / SPRITE_SIZE - KAOMOJI_SIZE_PERCENT / 2,
  };
  let flipSprite = false;
  if (faces === 'right') {
    flipSprite = !facesRight;
  } else if (faces === 'left') {
    flipSprite = facesRight;
  }
  const kaomojiSrc = `img/kaomoji/${kaomoji}.png`;
  const computedClass = `sprite-portrait ${className} ${flipSprite ? 'flipped' : ''} ${
    sprite.trust > EXCITED_TRUST_THRESHOLD ? 'sprite-is-excited' : ''}`;
  return (
    <button
      style={{
        width: SPRITE_SIZE,
        ...style,
      }}
      className={computedClass}
      type="button"
      onClick={onClick}
      disabled={!onClick}
    >
      { kaomoji ? (
        <img
          className="kaomoji"
          key={kaomoji}
          src={kaomojiSrc}
          alt={kaomoji}
          title={kaomoji}
          style={{
            width: `${KAOMOJI_SIZE_PERCENT}%`,
            height: `${KAOMOJI_SIZE_PERCENT}%`,
            left: `${kaomojiCoordinates.x}%`,
            top: `${kaomojiCoordinates.y}%`,
          }}
        />
      ) : '' }
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
  kaomoji: PropTypes.string,
};

SpritePortrait.defaultProps = {
  className: '',
  title: '',
  onClick: undefined,
  style: undefined,
  overlayColor: undefined,
  faces: '',
  kaomoji: '',
};
