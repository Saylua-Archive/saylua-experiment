import { combineReducers } from 'redux';

const initialGameState = {
  dayOffset: 0,
  wildSprite: {},
  activeSpriteId: null,
};

export function sayluaApp(state = initialGameState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export function mySprites(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const sayluaApp = combineReducers({
  gameState,
  mySprites,
});

export default sayluaApp;