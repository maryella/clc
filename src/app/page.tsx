"use client";
import { useState } from "react";
import {
  ActionButton,
  NumberButton,
  OperatorButton,
} from "./components/Button";
import { calculate, Operator } from "./modules/calculate";
import { actionKeys, numberKeys, operatorKeys } from "./modules/keyMap";

// to do
// edge cases
// style output

export default function Home() {
  const [display, setDisplay] = useState("0");
  const [changeDisplay, setChangeDisplay] = useState(true);
  const [firstNumber, setFirstNumber] = useState(0);
  const [buttonFocused, setButtonFocused] = useState<string | null>(null);

  function updateDisplay(char: string) {
    if (changeDisplay) {
      if (char === ".") {
        setDisplay(display + char);
      } else {
        setDisplay(char);
      }
      setChangeDisplay(false);
    } else {
      setDisplay(display + char);
    }
  }

  function toggleNegative() {
    const isNegative = display[0] === "-";
    if (!isNegative) {
      setDisplay("-" + display);
    } else {
      setDisplay(display.substring(1));
    }
  }

  const [operator, setOperator] = useState<Operator | null>(null);

  function updateOperator(value: Operator) {
    if (firstNumber) {
      handleCalculate();
    } else {
      setFirstNumber(Number.parseFloat(display));
    }
    setOperator(value);
    setChangeDisplay(true);
  }

  function handleCalculate() {
    const secondNumber = Number.parseFloat(display);
    if (firstNumber && secondNumber && operator) {
      const result = calculate({ firstNumber, secondNumber, operator });

      setFirstNumber(result);
      setDisplay(result.toString());
      setChangeDisplay(true);
      setOperator(null);
    }
  }

  function getPercent() {
    const percent = Number.parseFloat(display) / 100;
    setDisplay(percent.toString());
  }

  function clear() {
    setDisplay("0");
    setChangeDisplay(true);
    setFirstNumber(0);
    setOperator(null);
  }

  function handleKeyPress(event: KeyboardEvent) {
    const { key } = event;

    if (numberKeys[key]) {
      updateDisplay(key);
    } else if (operatorKeys[key]) {
      setOperator(operatorKeys[key]);
    } else if (actionKeys[key]) {
      if (key === "%") {
        getPercent();
      }
      if (
        key === "Enter" &&
        (buttonFocused === null || buttonFocused === "enter")
      ) {
        handleCalculate();
      }
      if (key === "C" || key === "c") {
        clear();
      }
    }
  }

  return (
    <div className="flex h-screen max-h-screen border-2 border-gray-800">
      <div
        tabIndex={1}
        className="flex flex-col w-full max-w-[600px]"
        onKeyDown={(e) => handleKeyPress(e.nativeEvent)}
      >
        <div className="grid grid-cols-4">
          <div
            className={`grid h-24 col-span-4 border border-cyan-500 p-3 justify-items-end items-center`}
          >
            <p className="text-fuchsia-700 text-5xl font-extrabold">
              {display}
            </p>
          </div>
          <ActionButton
            type="function"
            display="C"
            value="clear"
            onClick={() => clear()}
            setButtonFocused={setButtonFocused}
          />
          <ActionButton
            type="function"
            display="%"
            value="percent"
            onClick={() => getPercent()}
            setButtonFocused={setButtonFocused}
          />
          <ActionButton
            type="function"
            display="+/-"
            value="toggleNegative"
            onClick={toggleNegative}
            setButtonFocused={setButtonFocused}
          />
          <OperatorButton
            type="function"
            display="÷"
            value="divide"
            onClick={updateOperator}
            setButtonFocused={setButtonFocused}
            active={operator === "divide"}
          />
          <NumberButton
            type="number"
            value="1"
            display="1"
            onClick={updateDisplay}
            setButtonFocused={setButtonFocused}
          />
          <NumberButton
            type="number"
            value="2"
            display="2"
            onClick={updateDisplay}
            setButtonFocused={setButtonFocused}
          />
          <NumberButton
            type="number"
            value="3"
            display="3"
            onClick={updateDisplay}
            setButtonFocused={setButtonFocused}
          />
          <OperatorButton
            type="function"
            display="×"
            value="multiply"
            onClick={updateOperator}
            setButtonFocused={setButtonFocused}
            active={operator === "multiply"}
          />
          <NumberButton
            type="number"
            value="4"
            display="4"
            onClick={updateDisplay}
            setButtonFocused={setButtonFocused}
          />
          <NumberButton
            type="number"
            value="5"
            display="5"
            onClick={updateDisplay}
            setButtonFocused={setButtonFocused}
          />
          <NumberButton
            type="number"
            value="6"
            display="6"
            onClick={updateDisplay}
            setButtonFocused={setButtonFocused}
          />
          <OperatorButton
            type="function"
            display="-"
            value="subtract"
            onClick={updateOperator}
            setButtonFocused={setButtonFocused}
            active={operator === "subtract"}
          />
          <NumberButton
            type="number"
            value="7"
            display="7"
            onClick={updateDisplay}
            setButtonFocused={setButtonFocused}
          />
          <NumberButton
            type="number"
            value="8"
            display="8"
            onClick={updateDisplay}
            setButtonFocused={setButtonFocused}
          />
          <NumberButton
            type="number"
            value="9"
            display="9"
            onClick={updateDisplay}
            setButtonFocused={setButtonFocused}
          />
          <OperatorButton
            type="function"
            display="+"
            value="add"
            onClick={updateOperator}
            setButtonFocused={setButtonFocused}
            active={operator === "add"}
          />
          <NumberButton
            type="number"
            value="."
            display="."
            onClick={updateDisplay}
            setButtonFocused={setButtonFocused}
          />
          <NumberButton
            type="number"
            display="0"
            value="0"
            onClick={updateDisplay}
            style="col-span-2 !aspect-auto"
            setButtonFocused={setButtonFocused}
          />
          <ActionButton
            type="function"
            display="="
            value="enter"
            onClick={() => handleCalculate()}
            setButtonFocused={setButtonFocused}
          />
        </div>
      </div>
    </div>
  );
}
