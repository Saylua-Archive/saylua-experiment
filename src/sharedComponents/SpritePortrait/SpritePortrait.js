import React from 'react';
import './SpritePortrait.css';

export default function SpritePortrait(props) {
  const {sprite, title, onClick} = props;
  return (
    <img
      className="sprite-portrait"
      src={`img/sprites/${sprite.species}/${sprite.color}.png`}
      alt={sprite.species}
      title={title}
      onClick={onClick}
    />
  );
}
