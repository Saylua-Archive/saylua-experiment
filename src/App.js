import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import soulName from './helpers/name/soulName';
import { capitalizeFirst, randomChoice } from './helpers/utils';
import './App.css';
import WildernessView from './modules/WildernessView';

import SpriteHeadshot from './sharedComponents/SpriteHeadshot/SpriteHeadshot';

import { PLACES } from './gameData/places';
import { SHE_PRONOUNS, HE_PRONOUNS, THEY_PRONOUNS } from './textData/pronouns';
import { SPRITE_COATS, CANONICAL_SPRITE_COATS } from './textData/spriteEncyclopedia';
import { ENCOUNTER_TEMPLATES } from './templates/templates';

import { addWildSprite, befriendWildSprite, setActiveSprite, interactWithSprite,
  clearInteractions } from './reducers/spriteReducer';
import { advanceDay, addTreat, setEventText, setActiveRegion } from './reducers/gameReducer';
import CityView from './modules/CityView';


const generateSprite = (speciesList) => {
  const { common, rare } = speciesList;
  let species;
  if (Math.random() < 0.3) {
    species = randomChoice(rare);
  } else {
    species = randomChoice(common);
  }

  let color = CANONICAL_SPRITE_COATS[species];
  if (Math.random() < 0.4) {
    color = randomChoice(SPRITE_COATS[species]);
  }
  return {
    name: capitalizeFirst(soulName()),
    species,
    color,
    trust: -5,
    distance: 5,
    grammar: randomChoice([SHE_PRONOUNS, HE_PRONOUNS,
      THEY_PRONOUNS]),
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.generateWildSprite();
  }

  generateWildSprite(regionName) {
    const regionId = regionName || this.props.activeRegionId;
    const { availableSpecies } = PLACES[regionId];
    const newSprite = generateSprite(availableSpecies);
    this.props.addWildSprite(newSprite);
    this.props.setEventText(randomChoice(ENCOUNTER_TEMPLATES)(newSprite));
  }

  befriendWildSprite() {
    const { availableSpecies } = PLACES[this.props.activeRegionId];
    const newSprite = generateSprite(availableSpecies);
    this.props.befriendWildSprite(newSprite);
  }

  currentTime() {
    const date = new Date();
    const { dayOffset } = this.props;
    date.setDate(date.getDate() + dayOffset);
    return date;
  }

  hasBeenADaySincePlaying() {
    const { lastPlayed } = this.props;
    const lastPlayedDate = new Date(lastPlayed);
    const now = this.currentTime();

    return now.toDateString() !== lastPlayedDate.toDateString();
  }

  currentSprite() {
    const { activeSpriteId, spritesById, wildSpriteId } = this.props;
    if (!activeSpriteId) return spritesById[wildSpriteId];
    return spritesById[activeSpriteId];
  }

  render() {
    const sprite = this.currentSprite();
    if (!sprite) return null;
    const { mySpriteIds, activeSpriteId, activeRegionId } = this.props;
    const now = this.currentTime();
    const isWildSprite = !activeSpriteId;

    const activeRegion = PLACES[activeRegionId];

    return (
      <div className="saylua">
        <div className="sprite-list">
          <button
            type="button"
            className={`change-sprite${isWildSprite ? ' selected' : ''}`}
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
                <SpriteHeadshot sprite={this.props.spritesById[id]} />
              </button>
            ))
          }
        </div>
        <div className="interaction-container">
          <div className="place-list">
            {
              Object.keys(PLACES).map((canonName) => {
                const place = PLACES[canonName];
                return (
                  <button
                    type="button"
                    className={`change-sprite${canonName === activeRegionId ? ' selected' : ''}`}
                    key={canonName}
                    onClick={() => {
                      this.props.setActiveRegion(canonName);

                      if (place.availableSpecies) {
                        this.generateWildSprite(canonName);
                      }
                    }}
                    style={{
                      backgroundImage: `url('img/wilderness/${canonName}.jpg')`,
                      backgroundSize: 'cover',
                    }}
                  />
                );
              })
            }
          </div>
          {
            activeRegion.view === WildernessView
              ? (
                <WildernessView
                  sprite={sprite}
                  region={activeRegion}
                />
              ) : <CityView region={activeRegion} />
          }
        </div>
        <button type="button" className="button" onClick={this.props.advanceDay}>Go to sleep</button>
        {`The date is ${now.toLocaleString()}`}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  spritesById: state.sprite.spritesById,
  mySpriteIds: state.sprite.mySpriteIds,
  activeSpriteId: state.sprite.activeSpriteId,
  wildSpriteId: state.sprite.wildSpriteId,
  interactionCounts: state.sprite.interactionCounts,
  lastPlayed: state.sprite.lastPlayed,

  dayOffset: state.game.dayOffset,
  treatCount: state.game.treatCount,
  eventText: state.game.eventText,
  activeRegionId: state.game.activeRegionId,
});

const mapDispatchToProps = {
  addWildSprite,
  befriendWildSprite,
  setActiveSprite,
  interactWithSprite,
  clearInteractions,
  advanceDay,
  addTreat,
  setEventText,
  setActiveRegion,
};

App.propTypes = {
  addWildSprite: PropTypes.func.isRequired,
  befriendWildSprite: PropTypes.func.isRequired,
  setActiveSprite: PropTypes.func.isRequired,
  advanceDay: PropTypes.func.isRequired,
  setEventText: PropTypes.func.isRequired,
  setActiveRegion: PropTypes.func.isRequired,

  spritesById: PropTypes.object.isRequired,
  mySpriteIds: PropTypes.array.isRequired,
  activeSpriteId: PropTypes.string.isRequired,
  wildSpriteId: PropTypes.string.isRequired,
  lastPlayed: PropTypes.number.isRequired,

  dayOffset: PropTypes.number.isRequired,
  activeRegionId: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
