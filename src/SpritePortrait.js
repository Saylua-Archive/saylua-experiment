import React from 'react';

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
