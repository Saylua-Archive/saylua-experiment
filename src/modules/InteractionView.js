import React from 'react';
import PropTypes from 'prop-types';

import SpritePortrait from '../sharedComponents/SpritePortrait/SpritePortrait';
import './InteractionView.css';

export default function InteractionView(props) {
  const { sprite, title, onClick, className } = props;
  const { distance } = sprite;
  const x = Math.random() * 0.5;
  const y = 0;
  const z = distance / 5;

  const HORIZON = 0.3;
  const SCALE = 350;

  const scaleFactor = (SCALE * (1 - z) + SCALE) / 2;
  const scaleStyle = `${scaleFactor}px`;
  const xStyle = `${x * 100}%`;
  const zStyle = `${((z * HORIZON) + y) * 100}%`;

  return (
    <div className={`wilderness-background ${className}`}>
      <div
        className="wilderness-sprite-wrapper"
        style={{
          left: xStyle,
          bottom: zStyle,
          width: scaleStyle,
        }}
      >
        <SpritePortrait
          sprite={sprite}
          title={title}
          onClick={onClick}
        />
      </div>
    </div>
  );
}

InteractionView.propTypes = {
  sprite: PropTypes.object.isRequired,
  title: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

InteractionView.defaultProps = {
  title: '',
  onClick: undefined,
  className: '',
};
