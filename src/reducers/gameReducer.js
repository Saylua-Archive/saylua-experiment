const initialState = {
  dayOffset: 0,
};

export const INCREMENT_DAY = 'INCREMENT_DAY';

export function incrementDay() {
  return { type: INCREMENT_DAY };
}

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_DAY:
      return Object.assign({}, state, { dayOffset: state.dayOffset + 1 });
    default:
      return state;
  }
}
