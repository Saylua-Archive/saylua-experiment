import { combineReducers } from 'redux';

import gameReducer from './gameReducer';
import spriteReducer from './spriteReducer';

const sayluaReducer = combineReducers({
  game: gameReducer,
  sprite: spriteReducer,
});

export default sayluaReducer;
