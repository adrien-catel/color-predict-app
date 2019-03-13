export class Criteria {
  /** Represent a Critera
   * 
   * @param {*} value 
   * @param {*} min 
   * @param {*} max 
   * @param {*} weight 
   */
  constructor(value, min, max, weight) {
    this.value = value;
    this.valueMin = min;
    this.valueMax = max;
    this.weight = weight;

    // if the value is > to the supposed max
    // we update the max with the new value
    if (this.value > this.max) {
      this.max = this.value;
    }
  }

  /**
   * Normalized the value
   * Calculate a value between 0 and 1 then multiply per 10
   * 
   */
  getNormalizedValue() {
    return ((this.value-this.valueMin)/(this.valueMax-this.valueMin)*10);
  }

  /**
   * Calculate the score
   */
  getScore() {
    throw "Need to be implemented";
  }
}