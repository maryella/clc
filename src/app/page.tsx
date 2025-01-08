"use client";
import { useState } from "react";

type Action = "add" | "subtract" | "multiply" | "divide" | "equal" | "clear";

export default function Home() {
  const [display, setDisplay] = useState("0");
  const [changeDisplay, setChangeDisplay] = useState(true);
  const [firstNumber, setFirstNumber] = useState(0);

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

  const [currentAction, setCurrentAction] = useState<Action | null>(null);

  function updateAction(action: Action) {
    setFirstNumber(Number.parseFloat(display));
    setCurrentAction(action);
    setChangeDisplay(true);
  }

  function calculate() {
    const numberB = Number.parseFloat(display);
    let result = 0;
    if (currentAction === "add") {
      result = firstNumber + numberB;
    }
    if (currentAction === "subtract") {
      result = firstNumber - numberB;
    }
    if (currentAction === "multiply") {
      result = firstNumber * numberB;
    }
    if (currentAction === "divide") {
      result = firstNumber / numberB;
    }

    setFirstNumber(result);
    setDisplay(result.toString());
    setChangeDisplay(true);
  }

  function clear() {
    setDisplay("0");
    setChangeDisplay(true);
    setFirstNumber(0);
    setCurrentAction(null);
  }

  return (
    <div className="flex h-screen max-h-screen border-2 border-gray-800">
      <div className="flex flex-col w-full">
        <div
          className={`flex h-[100px] border border-cyan-500 p-2 justify-end`}
        >
          <p className="text-fuchsia-400 text-4xl">{display}</p>
        </div>
        <Spacer />
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <NumberButton value="1" onClick={updateDisplay} />
              <Spacer />
              <NumberButton value="2" onClick={updateDisplay} />
              <Spacer />
              <NumberButton value="3" onClick={updateDisplay} />
            </div>
            <Spacer />
            <div className="flex flex-row">
              <NumberButton value="4" onClick={updateDisplay} />
              <Spacer />
              <NumberButton value="5" onClick={updateDisplay} />
              <Spacer />
              <NumberButton value="6" onClick={updateDisplay} />
            </div>
            <Spacer />
            <div className="flex flex-row">
              <NumberButton value="7" onClick={updateDisplay} />
              <Spacer />
              <NumberButton value="8" onClick={updateDisplay} />
              <Spacer />
              <NumberButton value="9" onClick={updateDisplay} />
            </div>
            <Spacer />
            <div className="flex flex-row">
              <NumberButton value="0" onClick={updateDisplay} />
              <Spacer />
              <NumberButton value="." onClick={updateDisplay} />
              <NumberButton value="+/-" onClick={toggleNegative} />
            </div>
          </div>
          <Spacer />
          <div className="flex flex-col">
            <FunctionButton
              display="÷"
              action="divide"
              onClick={updateAction}
            />
            <FunctionButton
              display="×"
              action="multiply"
              onClick={updateAction}
            />
            <FunctionButton
              display="-"
              action="subtract"
              onClick={updateAction}
            />
            <FunctionButton display="+" action="add" onClick={updateAction} />
          </div>
        </div>
        <div className="flex flex-row">
          <FunctionButton display="C" action="clear" onClick={() => clear()} />
          <FunctionButton
            display="="
            action="equal"
            onClick={() => calculate()}
          />
        </div>
      </div>
    </div>
  );
}

const buttonStyle = `p-3 h-[90px] aspect-square border content-center justify-items-center`;
function NumberButton({
  value,
  onClick,
}: {
  value: string;
  onClick?: (char: string) => void;
}) {
  function handleClick() {
    if (onClick) {
      onClick(value);
    }
  }

  return (
    <button
      onClick={() => handleClick()}
      className={`${buttonStyle} bg-pink-200 border-pink-300`}
    >
      <p className="text-fuchsia-700 text-5xl font-extrabold">{value}</p>
    </button>
  );
}

function FunctionButton({
  display,
  action,
  onClick,
}: {
  display: string;
  action: Action;
  onClick?: (action: Action) => void;
}) {
  function handleClick() {
    if (onClick) {
      onClick(action);
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`${buttonStyle} bg-purple-200 border-purple-300`}
    >
      <p className="text-fuchsia-700 text-5xl font-extrabold">{display}</p>
    </button>
  );
}

function Spacer() {
  return <div className="" />;
}
