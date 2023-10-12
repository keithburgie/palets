import chroma from "chroma-js";
import { ColorFormat, ColorValue } from "./types";

export function identifyColorFormat(color: string): ColorFormat {
  const hexRegex = /^#([A-Fa-f0-9]{3,4}){1,2}$/;
  const rgbRegex = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
  const rgbaRegex =
    /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(?:[0-1](?:\.\d+)?|\.?\d+)\s*\)$/;
  const hslRegex = /^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/;
  const hslaRegex =
    /^hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*(?:[0-1](?:\.\d+)?|\.?\d+)\s*\)$/;

  if (hexRegex.test(color)) return "hex";
  if (rgbRegex.test(color)) return "rgb";
  if (rgbaRegex.test(color)) return "rgba";
  if (hslRegex.test(color)) return "hsl";
  if (hslaRegex.test(color)) return "hsla";

  throw new Error("Unrecognized color format");
}

/**
 * Converts a color to a specified format, via [chroma-js](https://gka.github.io/chroma.js)
 */
export function convertColorToFormat(
  format: ColorFormat,
  color: chroma.Color
): string {
  switch (format) {
    case "hex":
      return chroma(color).hex();
    case "rgb":
    case "rgba":
      return chroma(color).css();
    case "hsl":
    case "hsla":
      return chroma(color).css("hsl");
  }
}

/**
 * Generates a color palette of alpha shades from a base color.
 */
export function generateAlphaShades(baseColor: ColorValue, numShades: number) {
  const alphaSteps = [
    0.04, 0.06, 0.08, 0.16, 0.24, 0.36, 0.48, 0.64, 0.8, 0.92, 1,
  ];
  const alphaShades = Array(numShades)
    .fill(baseColor)
    .map((color, i) => {
      const alphaColor = chroma(color).alpha(alphaSteps[i]);
      return convertColorToFormat("rgba", alphaColor);
    });

  return alphaShades;
}

/**
 * Generates an opinionated color palette of shades from a base color. The base color will be used as the "500" shade in a Tailwind or Chakra UI color palette, and the result will be similar to the color palettes in those frameworks.
 */
export function generateColorShades(baseColor: ColorValue, numShades: number) {
  const LUMINANCE_INCREASE = 0.65;
  const LUMINANCE_DECREASE = 0.21;
  const LIGHTNESS_CHANGE = 0.1;

  const baseLuminance = chroma(baseColor).luminance();

  const lightestShade = chroma(baseColor)
    .luminance(baseLuminance + LUMINANCE_INCREASE)
    .brighten(LIGHTNESS_CHANGE);

  const darkestShade = chroma(baseColor)
    .luminance(baseLuminance - LUMINANCE_DECREASE)
    .darken(LIGHTNESS_CHANGE);

  const colorShades = chroma
    .scale([lightestShade, baseColor, darkestShade])
    .mode("hsl")
    .colors(numShades);

  return colorShades;
}
