"use client";
import { useState } from "react";
import {
  ActionButton,
  NumberButton,
  OperatorButton,
} from "./components/Button";
import { calculate, Operator } from "./modules/calculate";
import { actionKeys, numberKeys, operatorKeys } from "./modules/keyMap";
import { getFontSize } from "./modules/getFontSize";
import { fascinateInline } from "./fonts";

export default function Home() {
  const [display, setDisplay] = useState("0");
  const [changeDisplay, setChangeDisplay] = useState(true);
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [buttonFocused, setButtonFocused] = useState<string | null>(null);
  const [previousButtonType, setPreviousButtonType] = useState<string | null>(
    null
  );
  const [displayFontSize, setDisplayFontSize] = useState("text-7xl");

  function updateDisplay(char: string) {
    if (char === "." && display.includes(".")) {
      return;
    }
    let result;
    if (changeDisplay) {
      if (char === ".") {
        if (operator === null) {
          result = display + char;
        } else {
          result = 0 + char;
        }
      } else {
        result = char;
      }
      setChangeDisplay(false);
    } else {
      result = display + char;
    }
    getFontSize({ length: result.length, updateFontSize: setDisplayFontSize });
    setDisplay(result);
  }

  function toggleNegative() {
    const isNegative = display[0] === "-";
    if (!isNegative) {
      setDisplay("-" + display);
    } else {
      setDisplay(display.substring(1));
    }
  }

  function updateOperator(value: Operator) {
    setOperator(value);
    if (firstNumber && previousButtonType === "number") {
      handleCalculate();
    } else {
      setFirstNumber(Number.parseFloat(display));
      setChangeDisplay(true);
    }
  }

  function handleCalculate() {
    const secondNumber = Number.parseFloat(display);

    if (firstNumber !== null && secondNumber !== null && operator) {
      const result = calculate({ firstNumber, secondNumber, operator });
      setFirstNumber(result);
      setDisplay(result.toString().substring(0, 7));
      setChangeDisplay(true);
    }
  }

  function getPercent() {
    const percent = (Number.parseFloat(display) / 100).toFixed(7);
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
    if (numberKeys[key] !== undefined) {
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
    <div className="flex h-screen max-h-screen items-center justify-center">
      <div
        tabIndex={1}
        className="max-h-screen border-8 border-fuchsia-300 dark:border-purple-950 rounded overflow-hidden"
        onKeyDown={(e) => handleKeyPress(e.nativeEvent)}
      >
        <div className="flex flex-1 flex-col max-h-vh bg-fuchsia-300 dark:bg-purple-950 overflow-hidden">
          <div className="py-1">
            <p
              className={`text-center ${fascinateInline.className} text-xl text-fuchsia-800 dark:text-fuchsia-200 `}
            >
              CUTE LIL CALCULATOR
            </p>
          </div>
          <div
            className={`flex flex-1 h-1/4 max-w-[308px] min-h-[97px] col-span-4 p-3 justify-end items-end bg-fuchsia-100 dark:bg-fuchsia-900 border-b border-purple-300 dark:border-purple-800 rounded-t `}
          >
            <p
              //   dir={displayFontSize === 1 ? "rtl" : "ltr"}
              className={`text-fuchsia-700 dark:text-fuchsia-300 ${displayFontSize} font-extrabold overflow-hidden truncate`}
            >
              {display}
            </p>
          </div>

          <div className="h-3/4 grid grid-cols-4">
            {/* row 1 */}
            <ActionButton
              display="C"
              value="clear"
              onClick={() => clear()}
              setButtonFocused={setButtonFocused}
              setPreviousButtonType={setPreviousButtonType}
            />
            <ActionButton
              display="%"
              value="percent"
              onClick={() => getPercent()}
              setButtonFocused={setButtonFocused}
              setPreviousButtonType={setPreviousButtonType}
            />
            <ActionButton
              display="+/-"
              value="toggleNegative"
              onClick={toggleNegative}
              setButtonFocused={setButtonFocused}
              setPreviousButtonType={setPreviousButtonType}
            />
            <OperatorButton
              display="÷"
              value="divide"
              onClick={updateOperator}
              setButtonFocused={setButtonFocused}
              active={operator === "divide"}
              setPreviousButtonType={setPreviousButtonType}
            />
            {/* row 2 */}
            <NumberButton
              value="1"
              display="1"
              onClick={updateDisplay}
              setButtonFocused={setButtonFocused}
              setPreviousButtonType={setPreviousButtonType}
            />
            <NumberButton
              value="2"
              display="2"
              onClick={updateDisplay}
              setButtonFocused={setButtonFocused}
              setPreviousButtonType={setPreviousButtonType}
            />
            <NumberButton
              value="3"
              display="3"
              onClick={updateDisplay}
              setButtonFocused={setButtonFocused}
              setPreviousButtonType={setPreviousButtonType}
            />
            <OperatorButton
              display="×"
              value="multiply"
              onClick={updateOperator}
              setButtonFocused={setButtonFocused}
              setPreviousButtonType={setPreviousButtonType}
              active={operator === "multiply"}
            />
            {/* row 3 */}
            <NumberButton
              value="4"
              display="4"
              onClick={updateDisplay}
              setButtonFocused={setButtonFocused}
              setPreviousButtonType={setPreviousButtonType}
            />
            <NumberButton
              value="5"
              display="5"
              onClick={updateDisplay}
              setButtonFocused={setButtonFocused}
              setPreviousButtonType={setPreviousButtonType}
            />
            <NumberButton
              value="6"
              display="6"
              onClick={updateDisplay}
              setButtonFocused={setButtonFocused}
              setPreviousButtonType={setPreviousButtonType}
            />
            <OperatorButton
              display="-"
              value="subtract"
              onClick={updateOperator}
              setButtonFocused={setButtonFocused}
              setPreviousButtonType={setPreviousButtonType}
              active={operator === "subtract"}
            />
            {/* row 4 */}
            <NumberButton
              value="7"
              display="7"
              onClick={updateDisplay}
              setButtonFocused={setButtonFocused}
              setPreviousButtonType={setPreviousButtonType}
            />
            <NumberButton
              value="8"
              display="8"
              onClick={updateDisplay}
              setButtonFocused={setButtonFocused}
              setPreviousButtonType={setPreviousButtonType}
            />
            <NumberButton
              value="9"
              display="9"
              onClick={updateDisplay}
              setButtonFocused={setButtonFocused}
              setPreviousButtonType={setPreviousButtonType}
            />
            <OperatorButton
              display="+"
              value="add"
              active={operator === "add"}
              onClick={updateOperator}
              setButtonFocused={setButtonFocused}
              setPreviousButtonType={setPreviousButtonType}
            />
            {/* row 5 */}
            <NumberButton
              value="."
              display="."
              onClick={updateDisplay}
              setButtonFocused={setButtonFocused}
              setPreviousButtonType={setPreviousButtonType}
            />
            <NumberButton
              display="0"
              value="0"
              onClick={updateDisplay}
              setPreviousButtonType={setPreviousButtonType}
              setButtonFocused={setButtonFocused}
              style="col-span-2 !aspect-auto"
            />
            <ActionButton
              display="="
              value="enter"
              onClick={() => handleCalculate()}
              setButtonFocused={setButtonFocused}
              setPreviousButtonType={setPreviousButtonType}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
