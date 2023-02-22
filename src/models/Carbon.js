class Carbon {
  /** @type {number} */
  cleanerThan;

  /** @type {number} */
  energyUsage;

  /** @type {number} */
  gridCo2;

  /** @type {boolean} */
  isSustainable;

  /** @type {number} */
  renewableCo2;

  /** @type {url} */
  url;

  constructor(data) {
    const { grid, renewable } = data.statistics.co2;
  
    this.isSustainable = data.green;
    this.cleanerThan = Math.ceil(data.cleanerThan * 100);
    this.gridCo2 = parseFloat(grid.grams.toFixed(4));
    this.energyUsage = parseFloat(data.statistics.energy.toFixed(6));
    this.renewableCo2 = parseFloat(renewable.grams.toFixed(4));
    this.url = data.url;
  }

  /** @return {object} */
  cleanerThanGrade() {
    return this.getGrade(this.cleanerThan);
  }

  /** @return {object} */
  createGrade(color, grade) {
    return {
      color,
      grade,
    };
  }

  /** @return {object} */
  energyGrade() {
    return this.getGrade(this.energyUsage * 1000, true);
  }

  /** @return {object} */
  getGrade(percentage, reverse = false) {

    if (percentage > 80) {
      return this.createGrade(
        !reverse ? '#0EAD69' : '#FB3640',
        !reverse ? 'A' : 'F',
      );
    }
    else if (percentage <= 80 && percentage > 70) {
      return this.createGrade(
        !reverse ? '#247BA0' : '#E98A15',
        !reverse ? 'B' : 'D'
      );
    }
    else if (percentage <= 70 && percentage > 60) {
      return this.createGrade('#F7CB15', 'C' );
    }
    else if (percentage <= 60 && percentage > 50) {
      return this.createGrade(
        !reverse ? '#E98A15' : '#E98A15' ,
        !reverse ? 'D' : 'B',
      );
    } else {
      return this.createGrade(
        !reverse ? '#FB3640' : '#0EAD69',
        !reverse ? 'F' : 'A',
      );
    }
  }

  /** @return {object} */
  overallGrade() {
    const gradeLookup = {
      'A': 90,
      'B': 75,
      'C': 65,
      'D': 55,
      'F': 40,
    };

    const average = [
      this.cleanerThanGrade().grade,
      this.energyGrade().grade,
      this.renewableGrade().grade,
      this.gridGrade().grade,
    ]
    .map((grade => gradeLookup[grade]))
    .reduce((a, b) => a + b) / 4;

    return this.getGrade(average);
  }

  /** @return {object} */
  gridGrade() {
    const gridPercentage = (this.renewableCo2 + this.gridCo2 / this.gridCo2) * 10;
    return this.getGrade(gridPercentage, true);
  }

  /** @return {object} */
  renewableGrade() {
    const renewablePercentage = (this.renewableCo2 + this.gridCo2 / this.renewableCo2) * 10;
    return this.getGrade(renewablePercentage);
  }
}

module.exports = Carbon;