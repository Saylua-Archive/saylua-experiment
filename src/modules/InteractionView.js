import React from 'react';
import PropTypes from 'prop-types';

import SpritePortrait from '../sharedComponents/SpritePortrait/SpritePortrait';
import './InteractionView.css';

const HORIZON = 0.3;
const IMAGE_OPACITY_COLOR = { h: 180, s: 25, l: 81 };
const BASE_SEPIA_COLOR = { h: 38, s: 24, l: 57 };
const SPRITE_SIZE = 350;
const TREE_WIDTH = 700;
const TREE_HEIGHT = 900;
const SPRITE_DISTANCE_INTEREVALS = 5;

export default function InteractionView(props) {
  const { sprite, region, title, onClick, className } = props;
  const { distance } = sprite;
  const x = Math.random() * 0.5;
  const y = 0;
  const z = distance / SPRITE_DISTANCE_INTEREVALS;

  const scaleFactor = ((1 - z) + 1) / 2;
  const scaleStyle = `${SPRITE_SIZE * scaleFactor}px`;
  const xStyle = `${x * 100}%`;
  const zStyle = `${((z * HORIZON) + y) * 100}%`;
  const opacityStyle = `${z / SPRITE_DISTANCE_INTEREVALS}`;
  const filterStyle = `contrast(0) sepia(100%) hue-rotate(${
    IMAGE_OPACITY_COLOR.h - BASE_SEPIA_COLOR.h}deg) saturate(${
    IMAGE_OPACITY_COLOR.s / BASE_SEPIA_COLOR.s * 50}%) brightness(${
    IMAGE_OPACITY_COLOR.l / BASE_SEPIA_COLOR.l * 100}%)`;

  const bgStyle = `url('/img/wilderness/${region.canonName}.jpg')`;

  const trees = [
    { x: Math.random() - 0.2, z: z + Math.random() - 0.5 },
    { x: Math.random() - 0.2, z: z + Math.random() - 0.5 },
  ];

  trees.sort((a, b) => ((a.z < b.z) ? 1 : -1));

  const treeImgs = trees.map(tree => (
    <div
      key={Math.random()}
      className="wilderness-scene-item"
      style={{
        left: `${tree.x * 100}%`,
        bottom: `${((tree.z * HORIZON)) * 100}%`,
        width: `${TREE_WIDTH * scaleFactor}px`,
        height: `${TREE_HEIGHT * scaleFactor}px`,
      }}
    >
      <img
        src="img/wilderness/tree2.png"
        alt="tree"
      />
      <img
        src="img/wilderness/tree2.png"
        alt="tree"
        style={{
          filter: filterStyle,
          opacity: opacityStyle,
        }}
      />
    </div>
  ));

  const spriteImg = (
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
  );

  const sceneImgs = treeImgs;

  // Insert the sprite based on their z position for proper overlapping
  let spriteIndex = 0;
  for (let i = 0; i < trees.length; i++) {
    if (trees[i].z > z) {
      spriteIndex = i + 1;
    }
  }
  sceneImgs.splice(spriteIndex, 0, spriteImg);

  return (
    <div
      className={`wilderness-background ${className}`}
      style={{
        backgroundImage: bgStyle,
      }}
    >
      {sceneImgs}
    </div>
  );
}

InteractionView.propTypes = {
  sprite: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired,
  title: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

InteractionView.defaultProps = {
  title: '',
  onClick: undefined,
  className: '',
};
