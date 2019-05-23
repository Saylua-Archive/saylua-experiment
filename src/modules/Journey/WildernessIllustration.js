import React from 'react';
import PropTypes from 'prop-types';

import SpritePortrait from '../../sharedComponents/SpritePortrait/SpritePortrait';
import './WildernessIllustration.css';
import SceneObject from './SceneObject';
import { getScaleFactor } from './shared';

const SPRITE_SIZE = 350;
const TREE_WIDTH = 500;
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

export default function WildernessIllustration(props) {
  const { activeSprite, region, className, interactions } = props;
  const encounterState = {};
  const sprite = encounterState.sprite || activeSprite || {};
  const { distance } = sprite;

  const { overlayColor, treeImg, horizon } = region;

  let x = Math.random();
  const y = 0;
  const z = distance / SPRITE_DISTANCE_INTERVALS;

  const scaleFactor = getScaleFactor(z);
  const scaledSpriteSize = SPRITE_SIZE * scaleFactor;
  x *= (1 - scaledSpriteSize / SCENE_WIDTH);

  const bgStyle = `url('img/wilderness/${region.canonName}.jpg')`;

  const spriteImg = (
    <SceneObject
      key={sprite.name}
      className="wilderness-sprite-image"
      extraProps={{ sprite }}
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

  const sceneImgs = [spriteImg];

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

WildernessIllustration.propTypes = {
  activeSprite: PropTypes.object,
  region: PropTypes.object.isRequired,
  className: PropTypes.string,
  interactions: PropTypes.array.isRequired,
};

WildernessIllustration.defaultProps = {
  activeSprite: {},
  className: '',
};
