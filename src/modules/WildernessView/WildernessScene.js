import React from 'react';
import PropTypes from 'prop-types';

import SpritePortrait from '../../sharedComponents/SpritePortrait/SpritePortrait';
import './WildernessScene.css';
import SceneObject from './SceneObject';

const HORIZON = 0.3;
const IMAGE_OVERLAY_COLOR = { r: 194, g: 218, b: 218, a: 0.3 };
const SPRITE_SIZE = 350;
const TREE_WIDTH = 450;
const TREE_HEIGHT = 700;
const SPRITE_DISTANCE_INTERVALS = 5;
const SCENE_WIDTH = 660;


// TODO: Turn this into a general "collision detection" function.
export const generateTreePosition = (spritePosition) => {
  const treeRatio = TREE_WIDTH / SCENE_WIDTH;
  const spriteRatio = spritePosition.size / SCENE_WIDTH;
  const x = Math.random() - treeRatio / 2;
  const spriteEndX = spritePosition.x + spriteRatio;
  let z;
  if (x >= spritePosition.x - treeRatio / 2 && x <= spriteEndX + treeRatio / 2) {
    // Tree overlaps x position with sprite, so make sure it's behind the sprite.
    const minZ = spritePosition.z + spriteRatio / 2;
    z = (1.3 - minZ) * Math.random() + minZ;
  } else {
    z = Math.random() - 0.8;
  }
  return { x, z, y: 0 };
};

export default function WildernessScene(props) {
  const { sprite, region, title, onClick, className, kaomoji } = props;
  const { distance } = sprite;


  let x = Math.random();
  const y = 0;
  const z = distance / SPRITE_DISTANCE_INTERVALS;

  const scaleFactor = ((1 - z) + 1) / 2;
  const scaledSpriteSize = SPRITE_SIZE * scaleFactor;
  x *= (1 - scaledSpriteSize / SCENE_WIDTH);

  const bgStyle = `url('img/wilderness/${region.canonName}.jpg')`;

  const spritePosition = { x, z, y, size: scaledSpriteSize };
  const trees = [
    generateTreePosition(spritePosition),
    generateTreePosition(spritePosition),
    generateTreePosition(spritePosition),
    generateTreePosition(spritePosition),
  ];

  const treeImgs = trees.map((tree, i) => (
    <SceneObject
      // eslint-disable-next-line react/no-array-index-key
      key={`tree-${i}`}
      className="wilderness-scene-item"
      src="img/wilderness/tree2_small.png"
      alt="tree"
      width={TREE_WIDTH}
      height={TREE_HEIGHT}
      x={tree.x}
      z={tree.z}
      overlayColor={IMAGE_OVERLAY_COLOR}
      horizon={HORIZON}
    />
  ));

  const spriteImg = (
    <SceneObject
      key={sprite.name}
      className="wilderness-sprite-image"
      extraProps={{ sprite, onClick, kaomoji }}
      title={title}
      width={SPRITE_SIZE}
      height={SPRITE_SIZE}
      x={x}
      z={z}
      y={y}
      overlayColor={IMAGE_OVERLAY_COLOR}
      horizon={HORIZON}
      componentType={SpritePortrait}
    />
  );

  const sceneImgs = [...treeImgs, spriteImg];

  sceneImgs.sort((a, b) => (b.props.z - a.props.z));

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

WildernessScene.propTypes = {
  sprite: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired,
  title: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  kaomoji: PropTypes.string,
};

WildernessScene.defaultProps = {
  title: '',
  onClick: undefined,
  className: '',
  kaomoji: '',
};
