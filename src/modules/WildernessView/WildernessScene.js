import React from 'react';
import PropTypes from 'prop-types';

import SpritePortrait from '../../sharedComponents/SpritePortrait/SpritePortrait';
import './WildernessScene.css';
import SceneObject from './SceneObject';
import { SPRITE_ENCYCLOPEDIA } from '../../gameData/spriteEncyclopedia';
import { getScaleFactor } from './shared';

const SPRITE_SIZE = 350;
const TREE_WIDTH = 500;
const TREE_HEIGHT = 750;
const SPRITE_DISTANCE_INTERVALS = 5;
const SCENE_WIDTH = 660;


// TODO: Turn this into a general "collision detection" function.
export const generateTreeCoordinates = (avoidedObject) => {
  if (!avoidedObject || !avoidedObject.size) {
    return {
      x: Math.random(),
      z: Math.random(),
      y: 0,
    };
  }
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
  const { activeSprite, region, className, encounterState, interactions } = props;
  const { kaomoji } = encounterState;
  const sprite = encounterState.sprite || activeSprite || {};
  const { distance } = sprite;

  const { overlayColor, treeImg, horizon } = region;

  const clickInteraction = interactions.find(interaction => interaction.type === 'pet') || {};
  const clickSprite = clickInteraction.isAvailable ? clickInteraction.interact : undefined;

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

  let trees = [];

  if (treeImg) {
    trees = [
      generateTreeCoordinates(headshotCoordinates),
      generateTreeCoordinates(headshotCoordinates),
      generateTreeCoordinates(headshotCoordinates),
      generateTreeCoordinates(headshotCoordinates),
    ];

    trees = trees.map((tree, i) => (
      <SceneObject
        // eslint-disable-next-line react/no-array-index-key
        key={`tree-${i}`}
        className="wilderness-scene-item"
        src={`img/wilderness/${treeImg}.png`}
        alt="tree"
        width={TREE_WIDTH}
        height={TREE_HEIGHT}
        x={tree.x}
        z={tree.z}
        overlayColor={overlayColor}
        horizon={horizon}
      />
    ));
  }

  const spriteImg = (
    <SceneObject
      key={sprite.name}
      className="wilderness-sprite-image"
      extraProps={{ sprite, onClick: clickSprite, kaomoji }}
      title={clickInteraction.buttonText}
      width={SPRITE_SIZE}
      height={SPRITE_SIZE}
      x={x}
      z={z}
      y={y}
      overlayColor={overlayColor}
      horizon={horizon}
      componentType={SpritePortrait}
    />
  );

  const sceneImgs = [...trees, spriteImg];

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
  activeSprite: PropTypes.object,
  region: PropTypes.object.isRequired,
  className: PropTypes.string,
  encounterState: PropTypes.object.isRequired,
  interactions: PropTypes.array.isRequired,
};

WildernessScene.defaultProps = {
  activeSprite: {},
  className: '',
};
