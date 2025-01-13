import { Operator } from "./calculate";

const numberKeys: { [key: string]: number | string } = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 5,
  "7": 7,
  "8": 8,
  "9": 9,
  "0": 0,
  ".": ".",
};

export type CalculatorAction = "enter" | "percent" | "clear" | "toggleNegative";

const actionKeys: { [key: string]: CalculatorAction } = {
  Enter: "enter",
  "%": "percent",
  C: "clear",
  c: "clear",
  toggleNegative: "toggleNegative",
};

const operatorKeys: { [key: string]: Operator } = {
  "+": "add",
  "-": "subtract",
  "/": "divide",
  "*": "multiply",
};

export { numberKeys, actionKeys, operatorKeys };
