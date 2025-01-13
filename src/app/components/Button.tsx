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

export { Button };
