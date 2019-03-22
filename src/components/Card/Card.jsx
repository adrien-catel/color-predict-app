import React from "react";
import styled from '@emotion/styled'

import './Card.css';
import { colorInterval, 
  COLOR_RANGE_CLOUD_DENSITY, 
  COLOR_RANGE,
  COLOR_RANGE_INVERT } from "../../utils/Colors";
import { getIcon } from "../../utils/Icons";

const SpanColor = styled.span(
  props => ({ 
    color: props.color,
  })
)

class Card extends React.Component {
  render() {
      const { title, summary, icon, cloudCover, windSpeed, humidity, visibility, prediction } = this.props;
      return (
        <div className="col-md-6 col-sm-12">
          <div className="card">
            <div className="card-products">
              <div className="card-product">
                <div className="card-thumbnail">
                  <img src={getIcon(icon)} alt={summary} />
                  {this._display_result(prediction)}
                </div>
                <h1 className="card-title">{title}</h1>
                <div className="card-description">
                  {summary}
                  <div className="card-detail-list">
                    <span className="card-detail">
                      cloud cov.: {this._display_cloud_density(cloudCover)}
                    </span>
                    <span className="card-detail">
                      wind: {this._display_wind_speed(windSpeed)}
                    </span>
                    <span className="card-detail">
                      humidity: {this._display_humidity(humidity)}
                    </span>
                    <span className="card-detail">
                      visibility: {this._display_visibility(visibility)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      );
  }

  _display_cloud_density(value) {
    var color = colorInterval(value, 0, 100, COLOR_RANGE_CLOUD_DENSITY);
    return (<SpanColor color={color}>{value}%</SpanColor>);     
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