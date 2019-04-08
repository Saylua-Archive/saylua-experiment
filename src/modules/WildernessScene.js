import React from 'react';
import PropTypes from 'prop-types';

import SpritePortrait from '../sharedComponents/SpritePortrait/SpritePortrait';
import './WildernessScene.css';
import CanvasImage from '../sharedComponents/CanvasImage/CanvasImage';

const HORIZON = 0.3;
const IMAGE_OVERLAY_COLOR = { r: 194, g: 218, b: 218, a: 0.3 };
const SPRITE_SIZE = 350;
const TREE_WIDTH = 700;
const TREE_HEIGHT = 900;
const SPRITE_DISTANCE_INTERVALS = 5;
const SCENE_WIDTH = 660;

export default function WildernessView(props) {
  const { sprite, region, title, onClick, className } = props;
  const { distance } = sprite;
  const x = Math.random();
  const y = 0;
  const z = distance / SPRITE_DISTANCE_INTERVALS;

  const scaleFactor = ((1 - z) + 1) / 2;
  const scaledSpriteSize = SPRITE_SIZE * scaleFactor;
  const scaleStyle = `${scaledSpriteSize}px`;
  const xStyle = `${x * (1 - scaledSpriteSize / SCENE_WIDTH) * 100}%`;
  const zStyle = `${((z * HORIZON) + y) * 100}%`;

  const bgStyle = `url('img/wilderness/${region.canonName}.jpg')`;

  const overlayColor = Object.assign({}, IMAGE_OVERLAY_COLOR, { a: IMAGE_OVERLAY_COLOR.a * z });

  const trees = [
    { x: Math.random() - 0.2, z: z + Math.random() - 1 },
    { x: Math.random() - 0.2, z: z + Math.random() - 0.9 },
  ];

  trees.sort((a, b) => ((a.z < b.z) ? 1 : -1));

  const treeImgs = trees.map((tree, i) => (
    <CanvasImage
      // eslint-disable-next-line react/no-array-index-key
      key={`tree-${i}`}
      className="wilderness-scene-item"
      src="img/wilderness/tree2_small.png"
      alt="tree"
      style={{
        left: `${tree.x * 100}%`,
        bottom: `${((tree.z * HORIZON)) * 100}%`,
        width: `${TREE_WIDTH * scaleFactor}px`,
        height: `${TREE_HEIGHT * scaleFactor}px`,
      }}
      overlayColor={overlayColor}
    />
  ));

  const spriteImg = (
    <SpritePortrait
      key={sprite.name}
      className="wilderness-sprite-image"
      sprite={sprite}
      onClick={onClick}
      title={title}
      style={{
        left: xStyle,
        bottom: zStyle,
        width: scaleStyle,
        height: scaleStyle,
      }}
      overlayColor={overlayColor}
    />
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

WildernessView.propTypes = {
  sprite: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired,
  title: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

WildernessView.defaultProps = {
  title: '',
  onClick: undefined,
  className: '',
};
