const initialState = {
  dayOffset: 0,
  treatCount: 20,
};

export const ADVANCE_DAY = 'ADVANCE_DAY';
export const USE_TREAT = 'USE_DAY';

export function advanceDay() {
  return { type: ADVANCE_DAY };
}

export function useTreat() {
  return { type: USE_TREAT };
}

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case ADVANCE_DAY:
      return Object.assign({}, state, { dayOffset: state.dayOffset + 1 });
    case USE_TREAT:
      return Object.assign({}, state, { treatCount: state.treatCount - 1 });
    default:
      return state;
  }
}
