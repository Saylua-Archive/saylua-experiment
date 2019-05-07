import React from 'react';
import PropTypes from 'prop-types';

import SpritePortrait from '../SpritePortrait/SpritePortrait';
import './SpriteAvatarView.css';

export default function SpriteAvatarView(props) {
  const { sprite } = props;
  return (
    <div className="pet-avatar-view">
      <img
        src="img/avatar/luarian.png"
        alt="You!"
        title="You!"
        aria-label="You!"
      />
      {sprite
        ? (
          <div className="active-pet-view">
            <SpritePortrait
              sprite={sprite}
              className="active-pet-image"
              faces="right"
            />
          </div>
        )
        : ''}
    </div>
  );
}

SpriteAvatarView.propTypes = {
  sprite: PropTypes.object,
};

SpriteAvatarView.defaultProps = {
  sprite: {},
};
