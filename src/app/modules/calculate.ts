export type Operator = "add" | "subtract" | "multiply" | "divide";

interface CalculateParameters {
  firstNumber: number;
  secondNumber: number;
  operator: Operator;
  onCalculate?: () => void;
}

function calculate({
  firstNumber,
  secondNumber,
  operator,
  onCalculate,
}: CalculateParameters) {
  let result = secondNumber;
  if (firstNumber) {
    if (operator === "add") {
      result = firstNumber + secondNumber;
    }
    if (operator === "subtract") {
      result = firstNumber - secondNumber;
    }
    if (operator === "multiply") {
      result = firstNumber * secondNumber;
    }
    if (operator === "divide") {
      if (secondNumber === 0) {
        result = NaN;
      } else {
        result = firstNumber / secondNumber;
      }
    }
  }

  if (onCalculate) {
    onCalculate();
  }

  return result;
}

export { calculate };
