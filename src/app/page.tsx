"use client";
import { useState } from "react";

// to
// clean up - move separate code to separate files
// edge cases
// style output

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

const functionKeys: { [key: string]: string } = {
  Enter: "=",
  "+": "+",
  "-": "-",
  "/": "/",
  "*": "*",
  "%": "%",
  C: "C",
  c: "c",
};

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

  const [currentAction, setCurrentAction] = useState<string | null>(null);

  function updateAction(action: string) {
    if (firstNumber) {
      calculate();
    } else {
      setFirstNumber(Number.parseFloat(display));
    }
    setCurrentAction(action);
    setChangeDisplay(true);
  }

  function calculate() {
    const B = Number.parseFloat(display);
    let result = B;
    if (firstNumber) {
      if (currentAction === "add") {
        result = firstNumber + B;
      }
      if (currentAction === "subtract") {
        result = firstNumber - B;
      }
      if (currentAction === "multiply") {
        result = firstNumber * B;
      }
      if (currentAction === "divide") {
        if (B === 0) {
          result = NaN;
        } else {
          result = firstNumber / B;
        }
      }

      setFirstNumber(result);
      setDisplay(result.toString());
      setChangeDisplay(true);
      setCurrentAction(null);
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
    setCurrentAction(null);
  }

  function mapKeyPress(event: KeyboardEvent) {
    const { key } = event;

    if (numberKeys[key]) {
      updateDisplay(key);
    }
    if (functionKeys[key]) {
      switch (key) {
        case "+":
          updateAction("add");
          break;
        case "-":
          updateAction("subtract");
          break;
        case "/":
          updateAction("divide");
          break;
        case "*":
          updateAction("multiply");
          break;
        case "%":
          getPercent();
          break;
        case "Enter":
          if (!buttonFocused || buttonFocused === "equal") {
            calculate();
          }
          break;
        case "C":
          clear();
          break;
        case "c":
          clear();
          break;
      }
    }
  }

  return (
    <div className="flex h-screen max-h-screen border-2 border-gray-800">
      <div
        tabIndex={1}
        className="flex flex-col w-full max-w-[600px]"
        onKeyDown={(e) => mapKeyPress(e.nativeEvent)}
      >
        <div className="grid grid-cols-4">
          <div
            className={`grid h-24 col-span-4 border border-cyan-500 p-3 justify-items-end items-center`}
          >
            <p className="text-fuchsia-700 text-5xl font-extrabold">
              {display}
            </p>
          </div>
          <Button
            type="function"
            display="C"
            value="clear"
            onClick={() => clear()}
            setButtonFocused={setButtonFocused}
          />
          <Button
            type="function"
            display="%"
            value=""
            onClick={() => getPercent()}
            setButtonFocused={setButtonFocused}
          />
          <Button
            type="function"
            display="+/-"
            value="toggleNeggative"
            onClick={toggleNegative}
            setButtonFocused={setButtonFocused}
          />
          <Button
            type="function"
            display="÷"
            value="divide"
            onClick={updateAction}
            setButtonFocused={setButtonFocused}
            active={currentAction === "divide"}
          />
          <Button
            type="number"
            value="1"
            display="1"
            onClick={updateDisplay}
            setButtonFocused={setButtonFocused}
          />
          <Button
            type="number"
            value="2"
            display="2"
            onClick={updateDisplay}
            setButtonFocused={setButtonFocused}
          />
          <Button
            type="number"
            value="3"
            display="3"
            onClick={updateDisplay}
            setButtonFocused={setButtonFocused}
          />
          <Button
            type="function"
            display="×"
            value="multiply"
            onClick={updateAction}
            setButtonFocused={setButtonFocused}
            active={currentAction === "multiply"}
          />
          <Button
            type="number"
            value="4"
            display="4"
            onClick={updateDisplay}
            setButtonFocused={setButtonFocused}
          />
          <Button
            type="number"
            value="5"
            display="5"
            onClick={updateDisplay}
            setButtonFocused={setButtonFocused}
          />
          <Button
            type="number"
            value="6"
            display="6"
            onClick={updateDisplay}
            setButtonFocused={setButtonFocused}
          />
          <Button
            type="function"
            display="-"
            value="subtract"
            onClick={updateAction}
            setButtonFocused={setButtonFocused}
            active={currentAction === "subtract"}
          />
          <Button
            type="number"
            value="7"
            display="7"
            onClick={updateDisplay}
            setButtonFocused={setButtonFocused}
          />
          <Button
            type="number"
            value="8"
            display="8"
            onClick={updateDisplay}
            setButtonFocused={setButtonFocused}
          />
          <Button
            type="number"
            value="9"
            display="9"
            onClick={updateDisplay}
            setButtonFocused={setButtonFocused}
          />
          <Button
            type="function"
            display="+"
            value="add"
            onClick={updateAction}
            setButtonFocused={setButtonFocused}
            active={currentAction === "add"}
          />
          <Button
            type="number"
            value="."
            display="."
            onClick={updateDisplay}
            setButtonFocused={setButtonFocused}
          />
          <Button
            type="number"
            display="0"
            value="0"
            onClick={updateDisplay}
            style="col-span-2 !aspect-auto"
            setButtonFocused={setButtonFocused}
          />
          <Button
            type="function"
            display="="
            value="equal"
            onClick={() => calculate()}
            setButtonFocused={setButtonFocused}
          />
        </div>
      </div>
    </div>
  );
}

function Button({
  active,
  display,
  value,
  onClick,
  style,
  type,
  setButtonFocused,
}: {
  active?: boolean;
  display: string;
  value: string;
  onClick?: (value: string) => void;
  style?: string;
  type?: "function" | "number";
  setButtonFocused: (val: string | null) => void;
}) {
  function handleClick() {
    if (onClick) {
      onClick(value);
    }
  }

  return (
    <button
      onClick={() => handleClick()}
      className={`p-3 aspect-square  ${
        active ? "border-8" : "border"
      } content-center justify-items-center ${
        type === "number"
          ? "bg-pink-200 border-pink-300"
          : "bg-purple-200 border-purple-300"
      }  ${style} `}
      onFocus={() => setButtonFocused(value)}
      onBeforeInput={() => setButtonFocused(null)}
    >
      <p className={`text-fuchsia-700 text-5xl font-extrabold`}>{display}</p>
    </button>
  );
}
