import React from 'react';
import PropTypes from 'prop-types';

import SpritePortrait from '../../sharedComponents/SpritePortrait/SpritePortrait';
import './WildernessIllustration.css';
import SceneObject from './SceneObject';
import { getScaleFactor } from './shared';

const SPRITE_SIZE = 350;
const SPRITE_DISTANCE_INTERVALS = 5;
const SCENE_WIDTH = 660;


export default function WildernessIllustration(props) {
  const { activeSprite, region, className } = props;
  const encounterState = {};
  const sprite = encounterState.sprite || activeSprite || {};
  const { distance } = sprite;

  const { overlayColor, horizon } = region;

  let x = Math.random();
  const y = 0;
  const z = distance / SPRITE_DISTANCE_INTERVALS;

  const scaleFactor = getScaleFactor(z);
  const scaledSpriteSize = SPRITE_SIZE * scaleFactor;
  x *= (1 - scaledSpriteSize / SCENE_WIDTH);

  const bgStyle = `url('img/wilderness/${region.canonName}.jpg')`;

  const spriteImg = (
    <SceneObject
      key={sprite.name || Math.random()}
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
};

WildernessIllustration.defaultProps = {
  activeSprite: {},
  className: '',
};
