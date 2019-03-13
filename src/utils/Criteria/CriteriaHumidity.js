import { Criteria } from "./Criteria";

export class CriteriaHumidity extends Criteria {
  constructor(value) {
    super(value, 0, 100, 1);
  }

  getScore() {
    const valueNormalized = this.getNormalizedValue();
    if (valueNormalized <= 5)
      return 50 + (valueNormalized*10);
    if (valueNormalized > 5)
      return 200 - (2*valueNormalized*10);
  }
}