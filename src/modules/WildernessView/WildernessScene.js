import React from 'react';
import PropTypes from 'prop-types';

import SpritePortrait from '../../sharedComponents/SpritePortrait/SpritePortrait';
import './WildernessScene.css';
import SceneObject from './SceneObject';
import { SPRITE_ENCYCLOPEDIA } from '../../gameData/spriteEncyclopedia';

const HORIZON = 0.3;
const IMAGE_OVERLAY_COLOR = { r: 194, g: 218, b: 218, a: 0.3 };
const SPRITE_SIZE = 350;
const TREE_WIDTH = 500;
const TREE_HEIGHT = 750;
const SPRITE_DISTANCE_INTERVALS = 5;
const SCENE_WIDTH = 660;


export const getScaleFactor = z => ((1 - z) + 1) / 2;

// TODO: Turn this into a general "collision detection" function.
export const generateTreeCoordinates = (avoidedObject) => {
  const treeRatio = TREE_WIDTH / SCENE_WIDTH;
  const avoidedRatio = avoidedObject.size;
  const avoidedEndX = avoidedObject.x + avoidedRatio;
  let z = Math.random() - (1 - avoidedObject.z);

  const scaledTreeWidth = treeRatio * getScaleFactor(z);

  // Let trees be half off the screen, either on the left or right edge.
  const x = Math.random() - scaledTreeWidth / 2;

  // TODO: Fix bug where trees aren't willing to get close enough to the
  // right side of the sprite's face.
  if (x >= avoidedObject.x - scaledTreeWidth / 2 && x <= avoidedEndX) {
    // Tree overlaps x position with sprite, so make sure it's behind the sprite.
    const minZ = avoidedObject.z + avoidedRatio / 2;
    z = (1.3 - minZ) * Math.random() + minZ;
  }
  return { x, z, y: 0 };
};

export const getSpriteHeadshotCoordinates = (spriteCoordinates, headshotPosition) => {
  // spriteCoordinates.size is the real pixel size of the scaled down sprite.
  const spriteScaleFactor = spriteCoordinates.size / SCENE_WIDTH;
  // Adjust headshot position by how much the sprite is scaled down.
  const left = headshotPosition.left / SPRITE_SIZE * spriteScaleFactor;

  // spriteScaleFactor is the ratio of the scene width the sprite takes up.
  // headshotPosition.size / SPRITE_SIZE is the ratio of the sprite with the headshot takes up.
  const size = headshotPosition.size / SPRITE_SIZE * spriteScaleFactor;

  return {
    x: spriteCoordinates.x + left,
    y: spriteCoordinates.y,
    z: spriteCoordinates.z,
    size,
  };
};

export default function WildernessScene(props) {
  const { sprite, region, title, onClick, className, kaomoji } = props;
  const { distance } = sprite;


  let x = Math.random();
  const y = 0;
  const z = distance / SPRITE_DISTANCE_INTERVALS;

  const scaleFactor = getScaleFactor(z);
  const scaledSpriteSize = SPRITE_SIZE * scaleFactor;
  x *= (1 - scaledSpriteSize / SCENE_WIDTH);

  const bgStyle = `url('img/wilderness/${region.canonName}.jpg')`;

  const { headshotPosition } = SPRITE_ENCYCLOPEDIA[sprite.species] || {};

  const spriteCoordinates = { x, z, y, size: scaledSpriteSize };
  const headshotCoordinates = getSpriteHeadshotCoordinates(spriteCoordinates, headshotPosition);

  const trees = [
    generateTreeCoordinates(headshotCoordinates),
    generateTreeCoordinates(headshotCoordinates),
    generateTreeCoordinates(headshotCoordinates),
    generateTreeCoordinates(headshotCoordinates),
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
