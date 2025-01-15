function getFontSize({
  length,
  updateFontSize,
}: {
  length: number;
  updateFontSize: (val: string) => void;
}) {
  if (length === 8) {
    updateFontSize("text-6xl");
  }
  if (length > 8 && length <= 10) {
    updateFontSize("text-5xl");
  }
  if (length > 10 && length < 15) {
    updateFontSize("text-4xl");
  }
  if (length >= 15 && length < 18) {
    updateFontSize("text-3xl");
  }
  if (length >= 18 && length < 22) {
    updateFontSize("text-2xl");
  }
  if (length >= 22) {
    updateFontSize("text-xl");
  }
  if (length < 7) {
    updateFontSize("text-7xl");
  }
}

export { getFontSize };
