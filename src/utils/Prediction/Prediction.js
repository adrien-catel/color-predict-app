import { CriteriaCloud } from "../Criteria/CriteriaCloud";
import { CriteriaHumidity } from "../Criteria/CriteriaHumidity";
import { CriteriaVisibility } from "../Criteria/CriteriaVisibility";
import { CriteriaWind } from "../Criteria/CriteriaWind";
import { IsMorning } from "../../utils/Date";

export class Prediction {
  /**
   *  Represent a Prediction 
   */
  constructor(date, 
              cloudCoverValue, 
              windSpeedValue, 
              humidityValue, 
              visibilityValue, 
              summary, 
              icon) {
    this.date = date;
    this.criteriaCloud = new CriteriaCloud(Math.floor(cloudCoverValue*100));
    this.criteriaWind = new CriteriaWind(Math.floor(windSpeedValue));
    this.criteriaHumidity = new CriteriaHumidity(Math.floor(humidityValue*100));
    this.criteriaVisibility = new CriteriaVisibility(Math.floor(visibilityValue));
    this.summary = summary;
    this.icon = icon;
  }

  /**
   * Return the prediction title
   * from the date
   */
  getTitle() {
    return IsMorning(this.date) ? "Sunrise - " + this.date.toLocaleString() : "Sunset - " + this.date.toLocaleString();
  }

  /**
   * Return the prediction result
   * from a list of criteria
   */
  getResult() {
    var nominator = 0;
    var denominator = 0;

    const criteriaList = [
      this.criteriaCloud,
      this.criteriaWind,
      this.criteriaHumidity,
      this.criteriaVisibility
    ]

    criteriaList.forEach((criteria) => {
      nominator += criteria.getScore() * criteria.weight;
      denominator += criteria.weight;
    });
    return Math.floor((nominator/denominator));
  }
}
