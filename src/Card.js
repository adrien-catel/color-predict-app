import React from "react";
import styled from '@emotion/styled'

import Colors from "./Utils/Colors";

const SpanColor = styled.span(
    {
      color: Colors.optimal
    },
  )

class Card extends React.Component {
    render() {
        const { title, summary, cloudCover, pressure, windSpeed, humidity, visibility } = this.props;
        return (
            <div className="col-md-6 col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title text-center">{title}</h5>
                        <blockquote className="blockquote text-center font-italic">
                            <p className="mb-0">{summary}</p>
                        </blockquote>
                        <dl className="row">
                            <dd className="col-sm-8">Cloud Density</dd>
                            <dt className="col-sm-4">{this._display_cloud_density(cloudCover)}</dt>
                        </dl>
                        <dl className="row">
                            <dd className="col-sm-8">Pressure</dd>
                            <dt className="col-sm-4">{this._display_pressure(pressure)}</dt>
                        </dl>
                        <dl className="row">
                            <dd className="col-sm-8">Wind speed</dd>
                            <dt className="col-sm-4">{this._display_wind_speed(windSpeed)}</dt>
                        </dl>
                        <dl className="row">
                            <dd className="col-sm-8">Humidity</dd>
                            <dt className="col-sm-4">{this._display_humidity(humidity)}</dt>
                        </dl>
                        <dl className="row">
                            <dd className="col-sm-8">Visibility</dd>
                            <dt className="col-sm-4">{this._display_visibility(visibility)}</dt>
                        </dl>
                        {this._display_result(this.props)}
                    </div>
                </div>
            </div>
        );
    }

    _display_cloud_density(value) {
        return (
            // <span className="font-weight-bold">{value}</span>
            <SpanColor>{value}</SpanColor>
        )
    }

    _display_pressure(value) {
        return (
            <span className="font-weight-bold">{value}</span>
        )
    }

    _display_wind_speed(value) {
        return (
            <span className="font-weight-bold">{value}</span>
        )
    }

    _display_humidity(value) {
        return (
            <span className="font-weight-bold">{value}</span>
        )
    }

    _display_visibility(value) {
        return (
            <span className="font-weight-bold">{value}</span>
        )
    }

    _display_result(values) {
        const { cloudCover, pressure, windSpeed, humidity, visibility } = values;
        return (
            <div className="progress">
                <div className="progress-bar bg-success" />
            </div>
        )
    }
}

export default Card;