import { Operator } from "../modules/calculate";
import { CalculatorAction } from "../modules/keyMap";

interface ButtonProps<T> {
  active?: boolean;
  display: string;
  value: T;
  onClick?: (value: T) => void;
  style?: string;
  type?: "function" | "number";
  setButtonFocused: (val: string | null) => void;
}

function Button<T>({
  active,
  display,
  value,
  onClick,
  style,
  type,
  setButtonFocused,
}: ButtonProps<T>) {
  function handleClick() {
    if (onClick) {
      onClick(value);
    }
  }

  return (
    <button
      onClick={() => handleClick()}
      className={`aspect-square box-border ${
        active ? "border-4  p-[13px]" : "border  p-[16px]"
      } content-center justify-items-center ${
        type === "number"
          ? "bg-pink-200 border-pink-300"
          : "bg-purple-200 border-purple-300"
      }  ${style} `}
      onFocus={() => setButtonFocused(`${value}`)}
      onBeforeInput={() => setButtonFocused(null)}
    >
      <p className={`text-fuchsia-700 text-4xl font-extrabold`}>{display}</p>
    </button>
  );
}

function ActionButton(props: ButtonProps<CalculatorAction>) {
  return <Button type="number" {...props} />;
}

function NumberButton(props: ButtonProps<string>) {
  return <Button type="number" {...props} />;
}

function OperatorButton(props: ButtonProps<Operator>) {
  return <Button type="function" {...props} />;
}

export { ActionButton, NumberButton, OperatorButton };
