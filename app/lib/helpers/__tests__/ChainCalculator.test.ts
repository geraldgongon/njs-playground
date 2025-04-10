import { ChainCalculator } from "../ChainCalculator";

describe("ChainCalculator", () => {
  it("should calculate properly", () => {
    const calculator = new ChainCalculator(10);

    const result = calculator
      .add(5) //15
      .subtract(3) //12
      .multiply(2) //24
      .divide(4) //6
      .power(2) //36
      .getResult();

    expect(result).toEqual(36);
  });
});
