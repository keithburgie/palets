/**
 * Represents a color in any format. Chroma.js will determine if it's a valid color string.
 * - Hex strings like "#FFFFFF", "#FFF", "#FFFFFFAA", etc.
 * - RGB strings like "rgb(255, 255, 255)", "rgb(0, 0, 0)", etc.
 * - RGBA strings like "rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 0.5)", etc.
 * - HSL strings like "hsl(360, 100%, 50%)", etc.
 * - Named colors like "red", "blue", etc.
 */
export type ColorValue = string;

export type ColorFormat = "hex" | "rgb" | "rgba" | "hsl" | "hsla";

export type ColorSystem = "antDesign" | "chakra" | "tailwind";

export type ColorPaletteType = "alpha" | "shades";

interface CommonColorPaletteSpecs {
  /**
   * Will act as the key for the color palette object.
   */
  colorName: string;
  /**
   * The type of shades to generate: `'alpha'` or `'shades'`.
   */
  type?: ColorPaletteType;
}

export type ColorPalette = {
  [key: string]: {
    [key: number]: string;
  };
};

export interface ColorPaletteOptions {
  /**
   * The format to use for the output color shades.
   * - `format` will match the input color format by default.
   */
  colorFormat?: ColorFormat;
  /**
   * Color system to use for generating shades.
   * - "antDesign" outputs 10 shades from color-1 to color-10
   * - "chakra" outputs 10 shades from color-50 to color-900
   * - "tailwind" (default) outputs 11 shades from color-50 to color-950.
   */
  colorSystem?: ColorSystem;
}

export enum ColorValueType {
  Primary = "primaryValue",
  Single = "singleValue",
}

interface PrimaryColorSpecs extends CommonColorPaletteSpecs {
  /**
   * A `primaryValue` is a color that will be used as the base color for generating shades. It will be used as the "500" shade in a Tailwind or Chakra UI color palette.
   ```
   const redObj = { colorName: "red", primaryValue: "#f87171" }
   // Example
    const red = { colorName: "red", primaryValue: "#f87171" }
    returns => { red:  { 50: "#fee3e3", ... to 950 }}
   ```
   * In an "alpha" type color palette, the `primaryValue` will be used as the most opaque color, and the lighter alpha shades will be generated from there.
   ```
   // Example
    const redAlpha = { ...red, type: "alpha" }
    returns => { red: { 50: "rgba(248,113,113,0.04)", ... to 950 }
   ```
   */
  [ColorValueType.Primary]: ColorValue;
}

interface SingleColorSpecs extends CommonColorPaletteSpecs {
  /**
   * A `singleValue` will be returned as-is, in string form.
    ```
    const red = { colorName: "red", singleValue: "#f87171" }
    returns => {red: '#f87171'}
    ```
   */
  [ColorValueType.Single]: ColorValue;
}

export type ColorPaletteSpecs = PrimaryColorSpecs | SingleColorSpecs;
