import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import {
  loadUserPosition,
  setFirstPrediction,
  setSecondPrediction,
} from "../../actions/index";

import { CriteriaCloud } from "../../utils/Criteria/CriteriaCloud";
import { CriteriaHumidity } from "../../utils/Criteria/CriteriaHumidity";
import { CriteriaVisibility } from "../../utils/Criteria/CriteriaVisibility";
import { CriteriaWind } from "../../utils/Criteria/CriteriaWind";
import { Prediction } from "../../utils/Prediction/Prediction";

import { GetSunTimeInfo } from "../../utils/Weather";
import { IsMorning } from "../../utils/Date";

import "./CardBoard.css";
import Card from "../../components/Card";


class CardBoard extends React.Component {
  componentDidMount() {
    this.props.loadUserPosition()
                .then(() => {
                  this._init_cards(this.props.userPosition);
                });
  }

  render() {
    const { firstPrediction, secondPrediction } = this.props;

    if (!firstPrediction.isReady && !secondPrediction.isReady) {
      return (
        <p className="text-center">
          Loading the awesome prediction!
        </p>
      );
    }

    return (
      <div className="row">
        <Card
          title={firstPrediction.title}
          summary={firstPrediction.summary}
          cloudCover={firstPrediction.cloudCover}
          pressure={firstPrediction.pressure}
          windSpeed={firstPrediction.windSpeed}
          humidity={firstPrediction.humidity}
          visibility={firstPrediction.visibility}
          prediction={firstPrediction.prediction}
          icon={firstPrediction.icon}                    
        />
        <Card
          title={secondPrediction.title}
          summary={secondPrediction.summary}
          cloudCover={secondPrediction.cloudCover}
          pressure={secondPrediction.pressure}
          windSpeed={secondPrediction.windSpeed}
          humidity={secondPrediction.humidity}
          visibility={secondPrediction.visibility}
          prediction={secondPrediction.prediction}
          icon={secondPrediction.icon}
        />
      </div>
    );
  }

  _init_cards(position) {
    var ordered_date_list = new Array();
    // today's date
    var today = new Date();
    // get today's sun info
    var sun_today_info = GetSunTimeInfo(today, position);
    // if we already pass the sunrise
    if (sun_today_info.sunrise < today){
      // we need the tomorrow's info
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var sun_tomorrow_info = GetSunTimeInfo(tomorrow, position);
      // then we determine which info we display in which order
      if(sun_today_info.sunset > today) {
        // today and tomorrow info
        ordered_date_list[0] = sun_today_info.sunset;
        ordered_date_list[1] = sun_tomorrow_info.sunrise;
      } else {
        // today and tomorrow info
        ordered_date_list[0] = sun_tomorrow_info.sunrise;
        ordered_date_list[1] = sun_tomorrow_info.sunset;
      }
    } else {
      // only today info
      ordered_date_list[0] = sun_today_info.sunrise;
      ordered_date_list[1] = sun_today_info.sunset;
    }
    
    var apiParameters = { 
      params: { 
        latitude: position.latitude, 
        longitude: position.longitude,
        moment: ordered_date_list[0]
      }
    };
    axios.get("/api/darksky/loadtime/", apiParameters)
      .then(response => {
        this.props.setFirstPrediction(this._load_card_content(ordered_date_list[0], response.data.currently));
      })
      .catch(error => {
        console.log(error);
      })
    
    apiParameters = { 
      params: { 
        latitude: position.latitude, 
        longitude: position.longitude, 
        moment: ordered_date_list[1]
      }
    };
    axios.get("/api/darksky/loadtime/", apiParameters)
      .then(response => {
        this.props.setSecondPrediction(this._load_card_content(ordered_date_list[1], response.data.currently));
      })
      .catch(error => {
        console.log(error);
      })
  }

  _load_card_content(date, condition) {
    let criteriaCloud = new CriteriaCloud(Math.floor(condition.cloudCover*100));
    let criteriaWind = new CriteriaWind(Math.floor(condition.windSpeed));
    let criteriaHumidity = new CriteriaHumidity(Math.floor(condition.humidity*100));
    let criteriaVisibility = new CriteriaVisibility(Math.floor(condition.visibility));

    let criteriaList = [criteriaCloud, criteriaWind, criteriaHumidity, criteriaVisibility];
    let predictionResult = new Prediction(criteriaList).getResult();

    var content = {
      title: IsMorning(date) ? "Sunrise - " + date.toLocaleString() : "Sunset - " + date.toLocaleString(),
      windSpeed: criteriaWind.value,
      visibility: criteriaVisibility.value,
      pressure: Math.floor(condition.pressure),
      humidity: criteriaHumidity.value,
      cloudCover: criteriaCloud.value,
      prediction: predictionResult,
      summary: condition.summary,
      icon: condition.icon,
      isReady: true,
    }
    return content;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadUserPosition: () => dispatch(loadUserPosition()),
    setFirstPrediction: prediction => dispatch(setFirstPrediction(prediction)),
    setSecondPrediction: prediction => dispatch(setSecondPrediction(prediction))
  };
}

const mapStateToProps = ({user, prediction}) => {
  return { 
    userPosition: user.userPosition,
    firstPrediction: prediction.firstPrediction,
    secondPrediction: prediction.secondPrediction
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardBoard);