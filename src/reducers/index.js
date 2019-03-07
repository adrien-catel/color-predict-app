import { 
  SET_FIRST_PREDICTION,
  SET_SECOND_PREDICTION 
} from "../constants/action-types";

// initial state
const initialState = {
  firstPrediction: {},
  secondPrediction: {}
};

// always return a new version of the state
// never change the state itself directly
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FIRST_PREDICTION:
      // return the new first prediction
      return Object.assign({}, state, {
        firstPrediction: action.payload
      });
    case SET_SECOND_PREDICTION:
      // return the new second prediction 
      return Object.assign({}, state, {
        secondPrediction: action.payload
      });
    default:
      return state;
  }
};

export default rootReducer;