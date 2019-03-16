import React from 'react';
import './SpritePortrait.css';

export default function SpritePortrait(props) {
  return (
    <img
      className='sprite-portrait'
      src={`img/sprites/${props.sprite.species}/${props.sprite.color}.png`}
      alt={props.sprite.species}
      title={props.petText}
      onClick={props.onClick}
    />
  );
}
