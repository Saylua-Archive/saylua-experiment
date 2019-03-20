const initialState = {
  spritesById: {},
  mySpriteIds: [],
  activeSpriteId: null,
  wildSpriteId: null,
  spriteInteractions: {},
  lastPlayed: 0,
};

export const ADD_WILD_SPRITE = 'ADD_WILD_SPRITE';
export const BEFRIEND_WILD_SPRITE = 'BEFRIEND_WILD_SPRITE';
export const SET_ACTIVE_SPRITE = 'SET_ACTIVE_SPRITE';
export const INTERACT_WITH_SPRITE = 'INTERACT_WITH_SPRITE';
export const CLEAR_INTERACTIONS = 'CLEAR_INTERACTIONS';

export function addWildSprite(sprite) {
  return { type: ADD_WILD_SPRITE, sprite };
}

export function befriendWildSprite(sprite) {
  return { type: BEFRIEND_WILD_SPRITE };
}

export function setActiveSprite(id) {
  return { type: SET_ACTIVE_SPRITE, id };
}

export function interactWithSprite(id, interaction, trust, time) {
  return { type: INTERACT_WITH_SPRITE, id, interaction, trust, time };
}

export function clearInteractions() {
  return { type: CLEAR_INTERACTIONS };
}

export default function spriteReducer(state = initialState, action) {
  const id = action.sprite && action.sprite.name;
  switch (action.type) {
    case ADD_WILD_SPRITE:
      return Object.assign({}, state, {
        wildSpriteId: id,
        spritesById: Object.assign({}, state.spritesById, {
          [id]: action.sprite,
        }),
      });
    case BEFRIEND_WILD_SPRITE:
      return Object.assign({}, state, {
        wildSpriteId: null,
        mySpriteIds: state.mySpriteIds.concat(state.wildSpriteId),
      });
    case SET_ACTIVE_SPRITE:
      return Object.assign({}, state, {
        activeSpriteId: id,
      });
    case INTERACT_WITH_SPRITE:
      const trust = action.trust;
      const interaction = action.interaction;
      const metadata = state.spriteInteractions;
      return Object.assign({}, state, {
        spritesById: Object.assign({}, state.spritesById, {
          [id]: Object.assign({}, state.spritesById[id], {
            trust: state.spritesById[id].trust + 1,
          }),
        }),
        spriteInteractions: Object.assign({}, metadata, {
          [id]: Object.assign({}, metadata[id], {
            [interaction]: metadata[id][interaction] + 1,
          }),
        }),
        lastPlayed: action.time,
      });
    case CLEAR_INTERACTIONS:
      return Object.assign({}, state, {
        spriteInteractions: {},
      });
    default:
      return state;
  }
}
