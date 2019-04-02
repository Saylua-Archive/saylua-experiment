import React from 'react';
import PropTypes from 'prop-types';

import SpritePortrait from '../sharedComponents/SpritePortrait/SpritePortrait';
import './InteractionView.css';

const HORIZON = 0.3;
const IMAGE_OPACITY_COLOR = { h: 180, s: 25, l: 81 };
const BASE_SEPIA_COLOR = { h: 38, s: 24, l: 57 };

export default function InteractionView(props) {
  const { sprite, title, onClick, className } = props;
  const { distance } = sprite;
  const x = Math.random() * 0.5;
  const y = 0;
  const z = distance / 5;

  const scaleFactor = ((1 - z) + 1) / 2;
  const scaleStyle = `scale(${scaleFactor}, ${scaleFactor})`;
  const xStyle = `${x * 100}%`;
  const zStyle = `${((z * HORIZON) + y) * 100}%`;
  const opacityStyle = `${z / 5}`;
  const filterStyle = `contrast(0) sepia(100%) hue-rotate(${
    IMAGE_OPACITY_COLOR.h - BASE_SEPIA_COLOR.h}deg) saturate(${
    IMAGE_OPACITY_COLOR.s / BASE_SEPIA_COLOR.s * 50}%) brightness(${
    IMAGE_OPACITY_COLOR.l / BASE_SEPIA_COLOR.l * 100}%)`;

  return (
    <div className={`wilderness-background ${className}`}>
      <button
        type="button"
        className="wilderness-sprite-wrapper"
        style={{
          left: xStyle,
          bottom: zStyle,
          transform: scaleStyle,
        }}
        onClick={onClick}
        title={title}
      >
        <SpritePortrait
          className="wilderness-sprite-image"
          sprite={sprite}
        />
        <SpritePortrait
          className="wilderness-sprite-image"
          sprite={sprite}
          style={{
            filter: filterStyle,
            opacity: opacityStyle,
          }}
        />
      </button>
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
