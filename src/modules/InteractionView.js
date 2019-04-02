import React from 'react';
import PropTypes from 'prop-types';

import SpritePortrait from '../sharedComponents/SpritePortrait/SpritePortrait';
import './InteractionView.css';

const HORIZON = 0.3;
const BASE_SIZE = 350;
const IMAGE_OPACITY_COLOR = { h: 180, s: 25, l: 81 };
const BASE_SEPIA_COLOR = { h: 38, s: 24, l: 57 };

export default function InteractionView(props) {
  const { sprite, title, onClick, className } = props;
  const { distance } = sprite;
  const x = Math.random() * 0.5;
  const y = 0;
  const z = distance / 5;

  const scaleFactor = (BASE_SIZE * (1 - z) + BASE_SIZE) / 2;
  const scaleStyle = `${scaleFactor}px`;
  const xStyle = `${x * 100}%`;
  const zStyle = `${((z * HORIZON) + y) * 100}%`;
  const opacityStyle = `${((1 - z) + 5) / 6}`;
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
          width: scaleStyle,
          height: scaleStyle,
        }}
        onClick={onClick}
        title={title}
      >
        <SpritePortrait
          className="wilderness-sprite-image"
          sprite={sprite}
          style={{
            filter: filterStyle,
          }}
        />
        <SpritePortrait
          className="wilderness-sprite-image"
          sprite={sprite}
          style={{
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
