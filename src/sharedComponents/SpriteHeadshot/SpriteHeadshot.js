import React from 'react';
import './SpriteHeadshot.css';
import { SPRITE_ENCYCLOPEDIA } from '../../textData/spriteEncyclopedia';

const SPRITE_SIZE = 350;

export default function SpriteHeadshot(props) {
  const { sprite, className } = props;
  const { headshotCoordinates } = SPRITE_ENCYCLOPEDIA[sprite.species];
  const sizeMultiplier = 100 / headshotCoordinates.size;
  const imageSizePercent = sizeMultiplier * SPRITE_SIZE;
  return (
    <div className={`sprite-headshot ${className}`}>
      <img
        style={{
          height: `${imageSizePercent}%`,
          width: `${imageSizePercent}%`,
          top: `${sizeMultiplier * -headshotCoordinates.y}%`,
          left: `${sizeMultiplier * -headshotCoordinates.x}%`,
        }}
        src={`img/sprites/${sprite.species}/${sprite.color}.png`}
        alt={sprite.name}
        title={sprite.name}
      />
    </div>
  );
}
