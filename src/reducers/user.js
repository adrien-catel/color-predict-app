import { USER_POSITION_LOADED } from "../constants/action-types";

// initial state
const initialState = {
  userPosition: {},
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_POSITION_LOADED:
      // return the user position
      return Object.assign({}, state, {
        userPosition: action.payload
      });
    default:
      return state;
  }
}