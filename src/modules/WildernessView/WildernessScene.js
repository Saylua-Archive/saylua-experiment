import React from 'react';
import PropTypes from 'prop-types';

import SpritePortrait from '../../sharedComponents/SpritePortrait/SpritePortrait';
import './WildernessScene.css';
import SceneObject from './SceneObject';
import { randomChoice } from '../../helpers/utils';
import { KAOMOJI } from '../../gameData/kaomoji';

const HORIZON = 0.3;
const IMAGE_OVERLAY_COLOR = { r: 194, g: 218, b: 218, a: 0.3 };
const SPRITE_SIZE = 350;
const TREE_WIDTH = 700;
const TREE_HEIGHT = 900;
const SPRITE_DISTANCE_INTERVALS = 5;
const SCENE_WIDTH = 660;

export default function WildernessScene(props) {
  const { sprite, region, title, onClick, className } = props;
  const { distance } = sprite;

  const kaomoji = randomChoice(KAOMOJI);

  let x = Math.random();
  const y = 0;
  const z = distance / SPRITE_DISTANCE_INTERVALS;

  const scaleFactor = ((1 - z) + 1) / 2;
  const scaledSpriteSize = SPRITE_SIZE * scaleFactor;
  x *= (1 - scaledSpriteSize / SCENE_WIDTH);

  const bgStyle = `url('img/wilderness/${region.canonName}.jpg')`;

  const trees = [
    { x: Math.random() - 0.2, z: z + Math.random() - 1 },
    { x: Math.random() - 0.2, z: z + Math.random() - 0.9 },
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
};

WildernessScene.defaultProps = {
  title: '',
  onClick: undefined,
  className: '',
};
