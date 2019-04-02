import React from 'react';
import PropTypes from 'prop-types';

import './SpritePortrait.css';

export default function SpritePortrait(props) {
  const { sprite, title, onClick, className, style } = props;
  const image = `img/sprites/${sprite.species}/${sprite.color}.png`;
  if (onClick) {
    return (
      <button
        style={style}
        className={`sprite-portrait ${className}`}
        type="button"
        onClick={onClick}
      >
        <img
          src={image}
          alt={sprite.species}
          title={title}
        />
      </button>
    );
  }
  return (
    <img
      style={style}
      className={`sprite-portrait ${className}`}
      src={image}
      alt={sprite.species}
      title={title}
    />
  );
}

SpritePortrait.propTypes = {
  sprite: PropTypes.object.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

SpritePortrait.defaultProps = {
  className: '',
  title: '',
  onClick: undefined,
  style: undefined,
};
