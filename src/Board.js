import React from "react";
import DarkSkyApi from 'dark-sky-api';
import moment from 'moment';

import { GetSunTimeInfo } from "./utils/Weather";
import { IsMorning } from "./utils/Date";

import Card from "./Card";

DarkSkyApi.apiKey =  process.env.DARKSKY_API_KEY;

class Board extends React.Component {
    // init the component state
    state = {
        firstCard: "",
        secondCard: "",
    }

    componentDidMount() {
        // load the user position
        DarkSkyApi.loadPosition()
            .then(pos => {
                // then init the cards
                this._init_cards(pos);
            });
    }

    render() {
        const { firstCard, secondCard } = this.state;

        if (!firstCard && !secondCard) {
            return (
                <p className="text-center">
                    Loading the awesome prediction!
                </p>
            );
        }

        return (
            <div className="row">
                <Card
                    title={firstCard.title}
                    summary={firstCard.summary}
                    cloudCover={firstCard.cloudCover}
                    pressure={firstCard.pressure}
                    windSpeed={firstCard.windSpeed}
                    humidity={firstCard.humidity}
                    visibility={firstCard.visibility}
                />
                <Card
                    title={secondCard.title}
                    summary={secondCard.summary}
                    cloudCover={secondCard.cloudCover}
                    pressure={secondCard.pressure}
                    windSpeed={secondCard.windSpeed}
                    humidity={secondCard.humidity}
                    visibility={secondCard.visibility}
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

        // convert the first date to a moment
        var moment_first = moment(ordered_date_list[0]);
        DarkSkyApi.loadTime(moment_first)
            .then(result => {
                // update the state (re render)
                this.setState({firstCard: this._load_card_content(ordered_date_list[0], result.currently)})
            });

        // convert the second date to a moment
        var moment_second = moment(ordered_date_list[1]);
        DarkSkyApi.loadTime(moment_second)
            .then(result => {
                // update the state (re render)
                this.setState({secondCard: this._load_card_content(ordered_date_list[1], result.currently)})
            });
    }

    _load_card_content(date, condition) {
        var content = {
            title: IsMorning(date) ? "Sunrise - " + date.toLocaleString() : "Sunset - " + date.toLocaleString(),
            windSpeed: condition.windSpeed,
            visibility: condition.visibility,
            pressure: condition.pressure,
            humidity: condition.humidity,
            cloudCover: condition.cloudCover,
            summary: condition.summary,
        }
        return content;
    }
}

export default Board;