import React from "react";
import { connect } from "react-redux";

import {
  loadUserPosition,
  loadFirstPrediction,
  loadSecondPrediction,
} from "../../actions/index";

import { GetOrderedListSunTimeInfo } from "../../utils/Weather";

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
    var ordered_date_list = GetOrderedListSunTimeInfo(new Date(), position);
    this.props.loadFirstPrediction(ordered_date_list[0], position);
    this.props.loadSecondPrediction(ordered_date_list[1], position);
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadUserPosition: () => dispatch(loadUserPosition()),
    loadFirstPrediction: (date, position) => dispatch(loadFirstPrediction(date, position)),
    loadSecondPrediction: (date, position) => dispatch(loadSecondPrediction(date, position)),
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