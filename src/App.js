import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './App.css';

import './sharedComponents/sprite-headshot/sprite-headshot';

import { PLACES } from './modules/World/places';

import { setActiveSprite, getMySprites, getActiveSprite } from './reducers/spriteReducer';
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
    const { mySprites, activeSprite, activeRegionId } = this.props;
    const now = this.currentTime();

    const activeRegion = PLACES[activeRegionId];
    const hasActiveSprite = activeSprite && activeSprite.name;

    return (
      <div className="saylua">
        { activeSprite.name
          && (
            <div className="sidebar">
              <SpriteAvatarView sprite={activeSprite} />
            </div>
          )
        }
        <div className="main-column">
          <div className="sprite-list">
            <button
              type="button"
              className={`change-sprite${!hasActiveSprite ? ' selected' : ''}`}
              onClick={() => this.props.setActiveSprite()}
            >
              {`?`}
            </button>
            {
              mySprites.map(sprite => (
                <button
                  type="button"
                  className={`change-sprite${sprite.name === activeSprite.name ? ' selected' : ''}`}
                  key={sprite.name}
                  onClick={() => this.props.setActiveSprite(sprite.name)}
                >
                  <sprite-headshot sprite={JSON.stringify(sprite)} />
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
          <footer>
            <button type="button" className="button" onClick={this.props.advanceDay}>Go to sleep</button>
            {`The date is ${now.toLocaleString()}`}
          </footer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mySprites: getMySprites(state),
  activeSprite: getActiveSprite(state),
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

  mySprites: PropTypes.array.isRequired,
  activeSprite: PropTypes.object.isRequired,

  dayOffset: PropTypes.number.isRequired,
  activeRegionId: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
