import { Operator } from "../modules/calculate";
import { CalculatorAction } from "../modules/keyMap";

interface ButtonProps<T> {
  active?: boolean;
  display: string;
  value: T;
  onClick?: (value: T) => void;
  style?: string;
  type?: "action" | "number" | "operator";
  setButtonFocused: (val: string | null) => void;
  setPreviousButtonType: (val: string) => void;
}

function Button<T>({
  active,
  display,
  value,
  onClick,
  style,
  type,
  setButtonFocused,
  setPreviousButtonType,
}: ButtonProps<T>) {
  function handleClick() {
    setPreviousButtonType(`${type}`);
    if (onClick) {
      onClick(value);
    }
  }

  return (
    <button
      onClick={() => handleClick()}
      className={`aspect-square ${
        active ? "border-4  p-[13px]" : "border p-[16px]"
      } content-center justify-items-center ${
        type === "number"
          ? "bg-pink-200 border-pink-300 dark:bg-fuchsia-900 dark:border-fuchsia-800"
          : "bg-purple-200 border-purple-300 dark:bg-purple-900 dark:border-purple-800"
      }   ${style} `}
      onFocus={() => setButtonFocused(`${value}`)}
      onBlur={() => setButtonFocused(null)}
    >
      <p
        className={`text-fuchsia-700 dark:text-fuchsia-300 text-4xl font-extrabold`}
      >
        {display}
      </p>
    </button>
  );
}

function ActionButton(props: ButtonProps<CalculatorAction>) {
  return <Button type="action" {...props} />;
}

function NumberButton(props: ButtonProps<string>) {
  return <Button type="number" {...props} />;
}

function OperatorButton(props: ButtonProps<Operator>) {
  return <Button type="operator" {...props} />;
}

export { ActionButton, NumberButton, OperatorButton };
