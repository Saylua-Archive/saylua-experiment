import { INTERACT_WITH_SPRITE } from './spriteReducer';

const initialState = {
  dayOffset: 0,
  treatCount: 20,
};

export const ADVANCE_DAY = 'ADVANCE_DAY';
export const ADD_TREAT = 'ADD_TREAT';

export function advanceDay() {
  return { type: ADVANCE_DAY };
}

export function addTreat(treatIncreaseArg) {
  const treatIncrease = treatIncreaseArg || 1;
  return { type: ADD_TREAT, treatIncrease };
}

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case ADVANCE_DAY:
      return Object.assign({}, state, { dayOffset: state.dayOffset + 1 });
    case INTERACT_WITH_SPRITE:
    case ADD_TREAT:
      return Object.assign({}, state, {
        treatCount: state.treatCount + action.treatIncrease,
      });
    default:
      return state;
  }
}
