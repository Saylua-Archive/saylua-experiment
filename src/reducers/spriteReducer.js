import { createSelector } from 'reselect';

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

export function interactWithSprite(id, changes) {
  return {
    type: INTERACT_WITH_SPRITE,
    id,
    trust: changes.trust || 0,
    distance: changes.distance || 0,
  };
}

export const getActiveSpriteId = state => state.sprite.activeSpriteId;
export const getSpritesById = state => state.sprite.spritesById;
export const getMySpriteIds = state => state.sprite.mySpriteIds;
export const getActiveSprite = createSelector(
  [getSpritesById, getActiveSpriteId],
  (spritesById, activeSpriteId) => spritesById[activeSpriteId] || {}
);
export const getMySprites = createSelector(
  [getSpritesById, getMySpriteIds],
  (spritesById, mySpriteIds) => mySpriteIds.map(id => spritesById[id])
);

export default function spriteReducer(state = initialState, action) {
  const { trust, distance, newSprite, id } = action;
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
            distance: state.spritesById[id].distance + (distance || 0),
          }),
        }),
        lastPlayed: action.time,
      });
    default:
      return state;
  }
}
