import { 
  SET_FIRST_PREDICTION,
  SET_SECOND_PREDICTION 
} from "../constants/action-types";

export function setFirstPrediction(payload) {
  return { type: SET_FIRST_PREDICTION, payload }
};

export function setSecondPrediction(payload) {
  return { type: SET_SECOND_PREDICTION, payload }
};