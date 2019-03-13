import { Criteria } from "./Criteria";

export class CriteriaCloud extends Criteria {
  constructor(value) {
    super(value, 0, 100, 2);
  }

  getScore() {
    const valueNormalized = this.getNormalizedValue();
    if (valueNormalized <= 5)
      return 20 + (1.6*valueNormalized*10);
    if (valueNormalized > 5)
      return 200 - (2*valueNormalized*10);
  }
}