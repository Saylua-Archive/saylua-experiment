import React from 'react';

import SpritePortrait from '../sharedComponents/SpritePortrait/SpritePortrait';
import './InteractionView.css';

export default function InteractionView(props) {
  const {sprite, title, onClick} = props;
  return (
    <div className="wilderness-background">
      <SpritePortrait
        sprite={sprite}
        title={title}
        onClick={onClick}
      />
    </div>
  );
}
