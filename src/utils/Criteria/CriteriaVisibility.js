import { Criteria } from "./Criteria";

export class CriteriaVisibility extends Criteria {
  constructor(value) {
    super(value, 0, 10, 1);
  }

  getScore() {
    return (this.getNormalizedValue()*10);
  }
}