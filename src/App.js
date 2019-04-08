import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './App.css';

import SpriteHeadshot from './sharedComponents/SpriteHeadshot/SpriteHeadshot';

import { PLACES } from './gameData/places';

import { setActiveSprite } from './reducers/spriteReducer';
import { advanceDay, setActiveRegion } from './reducers/gameReducer';
import SpriteAvatarView from './sharedComponents/SpriteAvatarView/SpriteAvatarView';


class App extends Component {
  currentTime() {
    const date = new Date();
    const { dayOffset } = this.props;
    date.setDate(date.getDate() + dayOffset);
    return date;
  }

  render() {
    const { mySpriteIds, activeSpriteId, activeRegionId, spritesById } = this.props;
    const now = this.currentTime();

    const activeRegion = PLACES[activeRegionId];
    const activeSprite = spritesById[activeSpriteId];

    return (
      <div className="saylua">
        { activeSprite
          && (
            <div className="sidebar">
              <SpriteAvatarView sprite={activeSprite} />
            </div>
          )
        }
        <div>
          <div className="sprite-list">
            <button
              type="button"
              className={`change-sprite${!activeSpriteId ? ' selected' : ''}`}
              onClick={() => this.props.setActiveSprite()}
            >
              {`?`}
            </button>
            {
              mySpriteIds.map(id => (
                <button
                  type="button"
                  className={`change-sprite${id === activeSpriteId ? ' selected' : ''}`}
                  key={id}
                  onClick={() => this.props.setActiveSprite(id)}
                >
                  <SpriteHeadshot sprite={spritesById[id]} />
                </button>
              ))
            }
          </div>
          <div className="interaction-container">
            <div className="place-list">
              {
                Object.keys(PLACES).map(canonName => (
                  <button
                    type="button"
                    className={`change-sprite${canonName === activeRegionId ? ' selected' : ''}`}
                    key={canonName}
                    onClick={() => {
                      this.props.setActiveRegion(canonName);
                    }}
                    style={{
                      backgroundImage: `url('img/wilderness/${canonName}.jpg')`,
                      backgroundSize: 'cover',
                    }}
                  />
                ))
              }
            </div>
            {
              React.createElement(activeRegion.view, {
                region: activeRegion,
                key: activeRegion.canonName,
              })
            }
          </div>
          <button type="button" className="button" onClick={this.props.advanceDay}>Go to sleep</button>
          {`The date is ${now.toLocaleString()}`}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  spritesById: state.sprite.spritesById,
  mySpriteIds: state.sprite.mySpriteIds,
  activeSpriteId: state.sprite.activeSpriteId,
  lastPlayed: state.sprite.lastPlayed,

  dayOffset: state.game.dayOffset,
  activeRegionId: state.game.activeRegionId,
});

const mapDispatchToProps = {
  setActiveSprite,
  advanceDay,
  setActiveRegion,
};

App.propTypes = {
  setActiveSprite: PropTypes.func.isRequired,
  advanceDay: PropTypes.func.isRequired,
  setActiveRegion: PropTypes.func.isRequired,

  spritesById: PropTypes.object.isRequired,
  mySpriteIds: PropTypes.array.isRequired,
  activeSpriteId: PropTypes.string.isRequired,

  dayOffset: PropTypes.number.isRequired,
  activeRegionId: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
