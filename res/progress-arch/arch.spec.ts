import { Arch } from "./arch";

describe("Arch class", function() {
  let arch: Arch;

  beforeEach(() => {
    arch = new Arch(200, 200, 50, 1);
  });

  it("calculates arch dimensions", function() {
    expect(arch.percent).toBe(50);
  });

  describe("sizeThresholds tests", () => {
    it("should keep width if it's greater than 100 (width > 100)", () => {
      arch.width = 200;

      arch.sizeThresholds();

      expect(arch.width).toEqual(200);
    });

    it("should make width 100 if it's less than 100 (width < 100)", () => {
      arch.width = 55;
      arch.sizeThresholds();

      expect(arch.width).toEqual(100);
    });

    it("should keep strokeWidth if it's greater than 1 and less than width / 10", () => {
      arch.strokeWidth = 12;

      arch.sizeThresholds();

      expect(arch.strokeWidth).toEqual(12);
    });

    it("should make strokeWidth equal to width/20 if original is less than 1 (strokeWidth < 1)", () => {
      const expectedResult = arch.width / 20;
      arch.strokeWidth = 0.8;

      arch.sizeThresholds();

      expect(arch.strokeWidth).toEqual(expectedResult);
    });

    it("should make strokeWidth equal to width/20 if original is greater than width/10 (strokeWidth > width/10)", () => {
      const expectedResult = arch.width / 20;
      const range = arch.width / 10;

      arch.strokeWidth = range + 1;

      arch.sizeThresholds();

      expect(arch.strokeWidth).toEqual(expectedResult);
    });
  });

  it("should convert correctly from degrees to radians", () => {
    const operation = arch.degToRad(105).toFixed(4);

    expect(operation).toEqual("1.8326");
  });

  it("should correctly calculate necessary parameters", () => {
    arch = new Arch(200, 200, 50, 60);

    arch.calcArch();

    expect(arch.radius).toEqual(90);

    expect(arch.archInitX.toFixed(4)).toEqual("55.0000");
    expect(arch.archInitY.toFixed(4)).toEqual("177.9423");

    expect(arch.archEndX.toFixed(4)).toEqual("145.0000");
    expect(arch.archEndY.toFixed(4)).toEqual("177.9423");

    expect(arch.arch100Percent.toFixed(4)).toEqual("471.2389");
    expect(arch.archCurrentPercent.toFixed(4)).toEqual("235.6194");
  });
});
