import { INTERACTION_TYPES } from '../gameData/spriteInteractions';

const initialState = {
  spritesById: {},
  mySpriteIds: [],
  activeSpriteId: '',
  wildSpriteId: '',
  interactionCounts: {},
  lastPlayed: 0,
};

export const ADD_WILD_SPRITE = 'ADD_WILD_SPRITE';
export const BEFRIEND_WILD_SPRITE = 'BEFRIEND_WILD_SPRITE';
export const SET_ACTIVE_SPRITE = 'SET_ACTIVE_SPRITE';
export const INTERACT_WITH_SPRITE = 'INTERACT_WITH_SPRITE';
export const CLEAR_INTERACTIONS = 'CLEAR_INTERACTIONS';

export function addWildSprite(newSprite) {
  return { type: ADD_WILD_SPRITE, newSprite };
}

export function befriendWildSprite(newSprite) {
  return { type: BEFRIEND_WILD_SPRITE, newSprite };
}

export function setActiveSprite(id) {
  return { type: SET_ACTIVE_SPRITE, id };
}

export function interactWithSprite(id, interaction, treatIncrease, time) {
  const trust = INTERACTION_TYPES[interaction].trustIncrease
    ? INTERACTION_TYPES[interaction].trustIncrease() : 0;
  const distance = INTERACTION_TYPES[interaction].distanceDecrease
    ? INTERACTION_TYPES[interaction].distanceDecrease() : 0;
  return {
    type: INTERACT_WITH_SPRITE,
    id,
    interaction,
    trust,
    treatIncrease,
    time,
    distance,
  };
}

export function clearInteractions() {
  return { type: CLEAR_INTERACTIONS };
}

export default function spriteReducer(state = initialState, action) {
  const { trust, distance, interaction, newSprite, id } = action;
  const { interactionCounts } = state;
  const interactionCountsForSprite = interactionCounts[id] || {};
  switch (action.type) {
    case ADD_WILD_SPRITE:
      return Object.assign({}, state, {
        wildSpriteId: newSprite.name,
        spritesById: Object.assign({}, state.spritesById, {
          [newSprite.name]: newSprite,
        }),
      });
    case BEFRIEND_WILD_SPRITE:
      return Object.assign({}, state, {
        wildSpriteId: newSprite.name,
        mySpriteIds: state.mySpriteIds.concat(state.wildSpriteId),
        activeSpriteId: state.wildSpriteId,
        spritesById: Object.assign({}, state.spritesById, {
          [newSprite.name]: newSprite,
        }),
      });
    case SET_ACTIVE_SPRITE:
      return Object.assign({}, state, {
        activeSpriteId: id,
      });
    case INTERACT_WITH_SPRITE:
      return Object.assign({}, state, {
        spritesById: Object.assign({}, state.spritesById, {
          [id]: Object.assign({}, state.spritesById[id], {
            trust: state.spritesById[id].trust + trust,
            distance: state.spritesById[id].distance - (distance || 0),
          }),
        }),
        interactionCounts: Object.assign({}, interactionCounts, {
          [id]: Object.assign({}, interactionCountsForSprite, {
            [interaction]: interactionCountsForSprite[interaction] + 1 || 1,
          }),
        }),
        lastPlayed: action.time,
      });
    case CLEAR_INTERACTIONS:
      return Object.assign({}, state, {
        interactionCounts: {},
      });
    default:
      return state;
  }
}
