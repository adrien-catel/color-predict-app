import { 
  USER_POSITION_LOADED,
  SET_FIRST_PREDICTION,
  SET_SECOND_PREDICTION,
} from "../constants/action-types";

import DarkSkyApi from 'dark-sky-api';

export function setFirstPrediction(payload) {
  return { type: SET_FIRST_PREDICTION, payload }
};

export function setSecondPrediction(payload) {
  return { type: SET_SECOND_PREDICTION, payload }
};

export function loadUserPosition() {
  return function(dispatch) {
    return DarkSkyApi.loadPosition()
      .then(pos => {
          dispatch({ type: USER_POSITION_LOADED, payload: pos });
      });
  }
}