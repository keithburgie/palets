import chroma from "chroma-js";
import {
  generateColorShades,
  generateAlphaShades,
  identifyColorFormat,
  convertColorToFormat,
} from "./helpers";
import {
  ColorFormat,
  ColorSystem,
  ColorPaletteType,
  ColorPaletteSpecs,
  ColorPaletteOptions,
  ColorPalette,
  ColorValueType,
} from "./types";

/**
 * @TODO: Create a website that uses these functions, both as a "how to" demo and as an options to actually generate color palettes.
 *
 * @TODO: Create a way to fetch new palettes via API call.
 *
 * @TODO: Create contrasting colors for text
 * https://gka.github.io/chroma.js/#chroma-contrast
 *
 * @TODO: Create light and dark variants, seen here:
 * https://tailwindcss.com/docs/customizing-colors#color-object-syntax
 *
 * Inspiration:
 * - https://uicolors.app
 * - https://colorbox.io/
 * - https://www.tints.dev/
 * - https://smart-swatch.netlify.app/
 */

const DEFAULT_COLOR_FORMAT: ColorFormat = "hex";
const DEFAULT_COLOR_FRAMEWORK: ColorSystem = "tailwind";
const DEFAULT_PALETTE_TYPE: ColorPaletteType = "shades";

/**
 * Returns a color palette object with color steps mapped to their corresponding colors, suitable for frameworks like Tailwind CSS, Chakra UI, and Ant Design.
 *
 * @param {ColorPaletteSpecs} color - Definition of a color palette, including the color name, the color value, and palette type.
 *
 * @param {ColorPaletteOptions} [options] - Options for generating the color palette, including the output format and the color system to follow.
 *
 * @returns {ColorPalette} - A mapping of color steps to their corresponding colors.
 */
export function createColorPalette(
  color: ColorPaletteSpecs,
  options: ColorPaletteOptions = {}
): ColorPalette {
  const { colorName, type = DEFAULT_PALETTE_TYPE } = color;

  const mappedShades: ColorPalette = {
    [colorName]: {},
  };

  if (ColorValueType.Single in color) {
    mappedShades[colorName] = color[ColorValueType.Single];
  }

  if (ColorValueType.Primary in color) {
    const { primaryValue: baseColor } = color;

    const {
      colorFormat: format = DEFAULT_COLOR_FORMAT,
      colorSystem = DEFAULT_COLOR_FRAMEWORK,
    } = options;

    if (!chroma.valid(baseColor)) {
      throw new Error(
        `Invalid color: ${baseColor}. Please provide a valid color.`
      );
    }

    const colorPaletteSteps: {
      [key in ColorSystem]: number[];
    } = {
      antDesign: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      chakra: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
      tailwind: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    };

    const shadeKeys = colorPaletteSteps[colorSystem];

    const shadeValues =
      type === "shades"
        ? generateColorShades(baseColor, shadeKeys.length)
        : generateAlphaShades(baseColor, shadeKeys.length);

    const baseColorFormat = identifyColorFormat(baseColor);
    const outputColorFormat = format || baseColorFormat;

    shadeKeys.forEach((key, i) => {
      let colorShade = shadeValues[i];
      if (baseColorFormat !== outputColorFormat) {
        colorShade = convertColorToFormat(
          outputColorFormat,
          chroma(shadeValues[i])
        );
      }
      mappedShades[colorName][key] = colorShade;
    });
  }

  return mappedShades;
}

/**
 * Returns an array of color palettes, suitable for frameworks like Tailwind CSS, Chakra UI, and Ant Design.
 */
export function createColorPalettes(
  colors: (ColorPalette | ColorPaletteSpecs)[],
  options: ColorPaletteOptions = {}
): ColorPalette {
  const palettes: ColorPalette = {};

  const colorSpecs = colors.filter(
    (color): color is ColorPaletteSpecs => "colorName" in color
  );

  const colorPalettes = colors.filter(
    (color) => !colorSpecs.includes(color as ColorPaletteSpecs)
  );

  colorSpecs.forEach((color) => {
    const { colorName } = color;
    const colorPalette = createColorPalette(color, { ...options });
    palettes[colorName] = colorPalette[colorName];
  });

  colorPalettes.forEach((palette) => {
    Object.assign(palettes, palette);
  });

  return palettes;
}

/**
 * Creates CSS or SCSS variables for use in a color theme.
 */
export function createVariablesFromColorPalette(
  format: "css" | "scss",
  colorPalette: ColorPalette
) {
  const prefix = format === "css" ? "--" : "$";
  let cssVariables = "";

  for (const colorName in colorPalette) {
    const colorKey = prefix + colorName;
    if (typeof colorPalette[colorName] === "string") {
      cssVariables += `${colorKey}: ${colorPalette[colorName]};\n`;
    } else {
      for (const shade in colorPalette[colorName]) {
        cssVariables += `${colorKey}-${shade}: ${colorPalette[colorName][shade]};\n`;
      }
    }
  }

  return cssVariables;
}

/**
 * Creates an SVG color palette from a color palette object. Useful for creating a visual representation of a color palette in Figma.
 */
export function convertColorPaletteToSVG(colorPalette: ColorPalette) {
  const svgWidth = Object.keys(colorPalette).length * 100;
  const svgHeight = 100;

  let svg = `<svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">\n`;

  let xOffset = 0;

  for (const colorName in colorPalette) {
    const colorShades = colorPalette[colorName];

    for (const shade in colorShades) {
      svg += `<rect width="100" height="100" fill="${colorShades[shade]}" x="${xOffset}" y="0"/>\n`;
      xOffset += 100;
    }
  }

  svg += `</svg>`;

  return svg;
}

/**
 * Creates a color theme in the format specified by the `as` parameter. Output can be an object, CSS variables, SCSS variables, or an SVG, and will be used in a config or CSS file.
 */
export function createColorTheme(
  colorPalette: ColorPalette,
  as: "object" | "css-vars" | "scss-vars" | "svg"
) {
  switch (as) {
    case "object":
      return colorPalette;
    case "css-vars":
      return createVariablesFromColorPalette("css", colorPalette);
    case "scss-vars":
      return createVariablesFromColorPalette("scss", colorPalette);
    case "svg":
      return convertColorPaletteToSVG(colorPalette);
    default:
      return colorPalette;
  }
}
