export class Prediction {
  /** Represent a Prediction
   * 
   * @param {*} criteriaList 
   */
  constructor(criteriaList) {
    this.criteriaList = criteriaList;
  }

  /**
   * Return the prediction result
   * from a list of criteria
   */
  getResult() {
    var nominator = 0;
    var denominator = 0;
    this.criteriaList.forEach((criteria) => {
      nominator += criteria.getScore() * criteria.weight;
      denominator += criteria.weight;
    });
    return Math.floor((nominator/denominator));
  }
}
