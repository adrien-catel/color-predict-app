import { Criteria } from "./Criteria";

export class CriteriaWind extends Criteria {
  constructor(value) {
    super(value, 0, 50, 1);
  }

  getScore() {
    return 100 - (this.getNormalizedValue()*10);
  }
}