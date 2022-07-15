export class Arch {
  public width: number;
  public strokeWidth: number;
  public percent: number;
  public alphaDeg: number;

  public radius: number;
  public archInitX: number;
  public archInitY: number;
  public archEndX: number;
  public archEndY: number;
  public arch100Percent: number;
  public archCurrentPercent: number;

  constructor(
    width: number,
    strokeWidth: number,
    percent: number,
    alphaDeg: number
  ) {
    this.width = width;
    this.strokeWidth = strokeWidth;
    this.percent = percent;
    this.alphaDeg = alphaDeg;

    this.sizeThresholds();

    this.calcArch();
  }

  /**
   * Function to limit the minimum size of the arch
   */
  sizeThresholds() {
    if (this.width < 100) {
      this.width = 100;
    }
    if (this.strokeWidth > this.width / 10 || this.strokeWidth < 1) {
      this.strokeWidth = this.width / 20;
    }
  }

  /**
   * This function defines the reference values of the arch, including the initial
   * and final points, the radius depending on the strokeWidth, the arch length and
   * the progress arch length equivalent.
   */
  calcArch() {
    this.radius = this.width / 2 - this.strokeWidth;

    // Arrow and string are needed to calc the origin and end coords for the arch.
    const arrow =
      this.radius * (1 - Math.cos(this.degToRad(this.alphaDeg) / 2));
    const stringCirc =
      2 * this.radius * Math.sin(this.degToRad(this.alphaDeg) / 2);

    this.archInitX = this.radius - stringCirc / 2 + this.strokeWidth;
    this.archInitY = this.width - arrow - this.strokeWidth;

    this.archEndX = this.radius + stringCirc / 2 + this.strokeWidth;
    this.archEndY = this.width - arrow - this.strokeWidth;

    // Arch length is needed to provide accurate % representation
    const circLength = 2 * Math.PI * this.radius;
    const semiArchLength = this.degToRad(this.alphaDeg) * this.radius;

    this.arch100Percent = circLength - semiArchLength;
    this.archCurrentPercent =
      this.arch100Percent - (this.arch100Percent * this.percent) / 100;
  }

  /**
   * Converts the angle from degrees to radians
   * @param degrees Angle in degrees
   * @return radians
   */
  degToRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
}
