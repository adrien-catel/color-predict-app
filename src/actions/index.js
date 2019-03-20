import DarkSkyApi from 'dark-sky-api';
import axios from "axios";

import { 
  USER_POSITION_LOADED,
  SET_FIRST_PREDICTION,
  SET_SECOND_PREDICTION,
} from "../constants/action-types";

import { Prediction } from "../utils/Prediction/Prediction";

export function loadUserPosition() {
  return function(dispatch) {
    return DarkSkyApi.loadPosition()
      .then(pos => {
        dispatch({ type: USER_POSITION_LOADED, payload: pos });
      });
  }
}

export function loadFirstPrediction(date, position) {
  return loadPrediction(date, position, SET_FIRST_PREDICTION);
}

export function loadSecondPrediction(date, position) {
  return loadPrediction(date, position, SET_SECOND_PREDICTION);
}

export function loadPrediction(date, position, type) {
  return function(dispatch) {
    axios.get("/api/darksky/loadtime/", {
        params: { 
          latitude: position.latitude, 
          longitude: position.longitude, 
          moment: date
        }
      })
      .then(response => {
        const condition = response.data.currently;
        let prediction = new Prediction(date, 
                                        condition.cloudCover,
                                        condition.windSpeed,
                                        condition.humidity,
                                        condition.visibility,
                                        condition.summary,
                                        condition.icon);
        
        const content = {
          title: prediction.getTitle(),
          windSpeed: prediction.criteriaWind.value,
          visibility: prediction.criteriaVisibility.value,
          humidity: prediction.criteriaHumidity.value,
          cloudCover: prediction.criteriaCloud.value,
          prediction: prediction.getResult(),
          summary: prediction.summary,
          icon: prediction.icon,
          isReady: true,
        }
        dispatch({ type: type, payload: content });
      })
      .catch(error => {
        console.log(error);
      });
  }
}