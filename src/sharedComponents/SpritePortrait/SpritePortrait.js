import React from 'react';
import PropTypes from 'prop-types';

import './SpritePortrait.css';

export default function SpritePortrait(props) {
  const { sprite, title, onClick, className } = props;
  return (
    <button className={`sprite-portrait ${className}`} type="button" onClick={onClick}>
      <img
        src={`img/sprites/${sprite.species}/${sprite.color}.png`}
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
};

SpritePortrait.defaultProps = {
  className: '',
  title: '',
  onClick: undefined,
};
