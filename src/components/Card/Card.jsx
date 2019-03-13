import React from "react";
import styled from '@emotion/styled'

import './Card.css';
import { colorInterval, 
  COLOR_RANGE_CLOUD_DENSITY, 
  COLOR_RANGE,
  COLOR_RANGE_INVERT } from "/utils/Colors";
import { getIcon } from "/utils/Icons";

const SpanColor = styled.span(
  props => ({ 
    color: props.color,
  })
)

class Card extends React.Component {
  render() {
      const { title, summary, icon, cloudCover, pressure, windSpeed, humidity, visibility, prediction } = this.props;
      return (
        <div className="col-md-6 col-sm-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">{title}</h5>
              <blockquote className="blockquote text-center font-italic">
                <img src={getIcon(icon)} alt={summary} className="weather-icon" />                          
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
              {this._display_result(prediction)}
            </div>
          </div>
        </div>
      );
  }

  _display_cloud_density(value) {
    var color = colorInterval(value, 0, 100, COLOR_RANGE_CLOUD_DENSITY);
    return (<SpanColor color={color}>{value}%</SpanColor>);     
  }

  _display_pressure(value) {
    return (<span className="font-weight-bold">{value}</span>)
  }

  _display_wind_speed(value) {
    var color = colorInterval(value, 0, 100, COLOR_RANGE_INVERT);
    return (<SpanColor color={color}>{value} mPh</SpanColor>);  
  }

  _display_humidity(value) {
    var color = colorInterval(value, 0, 100, COLOR_RANGE_INVERT);
    return (<SpanColor color={color}>{value}%</SpanColor>);
  }

  _display_visibility(value) {
    var color = colorInterval(value, 0, 10, COLOR_RANGE);
    return (<SpanColor color={color}>{value}</SpanColor>);  
  }

  _display_result(value) {
    var color = colorInterval(value, 0, 100, COLOR_RANGE);
    return (<div className="card-result"><SpanColor color={color}>{value}%</SpanColor></div>);  
  }
}

export default Card;