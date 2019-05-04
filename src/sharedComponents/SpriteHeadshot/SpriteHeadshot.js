import React from 'react';
import PropTypes from 'prop-types';

import './SpriteHeadshot.css';
import { SPRITE_ENCYCLOPEDIA } from '../../modules/Sprite/spriteEncyclopedia';

const SPRITE_SIZE = 350;

export default function SpriteHeadshot(props) {
  const { sprite, className } = props;
  const { headshotPosition } = SPRITE_ENCYCLOPEDIA[sprite.species];
  const sizeMultiplier = 100 / headshotPosition.size;
  const imageSizePercent = sizeMultiplier * SPRITE_SIZE;
  return (
    <div className={`sprite-headshot ${className}`}>
      <img
        style={{
          height: `${imageSizePercent}%`,
          width: `${imageSizePercent}%`,
          top: `${sizeMultiplier * -headshotPosition.top}%`,
          left: `${sizeMultiplier * -headshotPosition.left}%`,
        }}
        src={`img/sprites/${sprite.species}/${sprite.color}.png`}
        alt={sprite.name}
        title={sprite.name}
      />
    </div>
  );
}

SpriteHeadshot.propTypes = {
  sprite: PropTypes.object.isRequired,
  className: PropTypes.string,
};

SpriteHeadshot.defaultProps = {
  className: '',
};
