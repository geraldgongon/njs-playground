// const calculator = new Calculator(10);

// const result = calculator
//     .add(5)
//     .subtract(3)
//     .multiply(2)
//     .divide(4)
//     .power(2)
//     .getResult();

// console.log(result); // Output: 64


export class ChainCalculator {
  constructor(initValue = 0) {
    this.result = initValue;
  }

  add (number) {
    this.result += number;
    return this;
  }

  subtract(number) {
    this.result -= number;
    return this;
  }
  multiply(number) {
    this.result *= number;
    return this;
  }
  divide(number) {
    this.result /= number;
    return this;
  }
  power(number) {
    this.result **= number;
    return this;
  }

  getResult() { return this.result}
  
}