import React from 'react';
import PropTypes from 'prop-types';

import SpritePortrait from '../sharedComponents/SpritePortrait/SpritePortrait';
import './InteractionView.css';

export default function InteractionView(props) {
  const { sprite, title, onClick, className } = props;
  return (
    <div className={`wilderness-background ${className}`}>
      <div className="wilderness-sprite-wrapper">
        <SpritePortrait
          sprite={sprite}
          title={title}
          onClick={onClick}
        />
      </div>
    </div>
  );
}

InteractionView.propTypes = {
  sprite: PropTypes.object,
  title: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
