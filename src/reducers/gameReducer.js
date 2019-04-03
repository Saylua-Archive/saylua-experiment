import { INTERACT_WITH_SPRITE } from './spriteReducer';

const initialState = {
  dayOffset: 0,
  treatCount: 20,
  eventText: '',
  activeRegionId: 'dawnlands',
};

export const ADVANCE_DAY = 'ADVANCE_DAY';
export const ADD_TREAT = 'ADD_TREAT';
export const SET_EVENT_TEXT = 'SET_EVENT_TEXT';
export const SET_ACTIVE_REGION = 'SET_ACTIVE_REGION';

export function advanceDay() {
  return { type: ADVANCE_DAY };
}

export function addTreat(treatIncreaseArg) {
  const treatIncrease = treatIncreaseArg || 1;
  return { type: ADD_TREAT, treatIncrease };
}

export function setEventText(eventTextArg) {
  const eventText = eventTextArg || '';
  return { type: SET_EVENT_TEXT, eventText };
}

export function setActiveRegion(regionId) {
  return { type: SET_ACTIVE_REGION, regionId };
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
    case SET_EVENT_TEXT:
      return Object.assign({}, state, { eventText: action.eventText });
    case SET_ACTIVE_REGION:
      return Object.assign({}, state, { activeRegionId: action.regionId });
    default:
      return state;
  }
}
