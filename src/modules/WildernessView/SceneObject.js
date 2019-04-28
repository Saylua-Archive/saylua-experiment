import React from 'react';
import PropTypes from 'prop-types';

import CanvasImage from '../../sharedComponents/CanvasImage/CanvasImage';
import './SceneObject.css';
import { getScaleFactor } from './shared';


const BOTTOM_OF_SCENE = -0.05;

export default function SceneObject(props) {
  const { extraProps, className, alt, title, src, width, height, x, z, y,
    horizon, overlayColor, componentType } = props;
  const scaleFactor = getScaleFactor(z);
  let computedOverlayColor;
  if (overlayColor) {
    computedOverlayColor = Object.assign({}, overlayColor, { a: overlayColor.a * z });
  }
  const bottomPosition = (z * (horizon - BOTTOM_OF_SCENE)) + BOTTOM_OF_SCENE;
  return (
    <div>
      {
        React.createElement(componentType, {
          className: `scene-object ${className}`,
          src,
          alt,
          title,
          style: {
            left: `${x * 100}%`,
            bottom: `${(bottomPosition + y) * 100}%`,
            width: `${width * scaleFactor}px`,
            height: `${height * scaleFactor}px`,
          },
          overlayColor: computedOverlayColor,
          ...extraProps,
        })
      }
    </div>
  );
}

SceneObject.propTypes = {
  className: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  src: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  x: PropTypes.number,
  z: PropTypes.number,
  y: PropTypes.number,
  horizon: PropTypes.number.isRequired,
  overlayColor: PropTypes.object,
  extraProps: PropTypes.object,
  componentType: PropTypes.func,
};

SceneObject.defaultProps = {
  className: '',
  alt: '',
  title: '',
  src: undefined,
  x: 0,
  z: 0,
  y: 0,
  overlayColor: undefined,
  extraProps: {},
  componentType: CanvasImage,
};
