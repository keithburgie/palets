import {
  createColorPalette,
  createColorPalettes,
  createVariablesFromColorPalette,
  convertColorPaletteToSVG,
  createColorTheme,
} from "./palets";
import { ColorPaletteOptions } from "./types";

describe("createColorPalette", () => {
  const baseColor = { colorName: "red", primaryValue: "#f87171" };

  test("creates color palette with default options", () => {
    const colorPalette = createColorPalette(baseColor);
    expect(colorPalette).toHaveProperty("red");
    // @TODO Add more specific assertions based on expected results
  });

  test("creates color palette with custom options", () => {
    const options: ColorPaletteOptions = {
      colorFormat: "rgb",
      colorSystem: "chakra",
    };
    const colorPalette = createColorPalette(baseColor, options);
    expect(colorPalette).toHaveProperty("red");
    // @TODO Add more specific assertions based on expected results
  });

  test("throws error for invalid base color", () => {
    const invalidColor = {
      colorName: "invalid",
      primaryValue: "invalid-color",
    };
    expect(() => createColorPalette(invalidColor)).toThrow("Invalid color");
  });
});

describe("createColorPalettes", () => {
  const colors = [
    { colorName: "red", primaryValue: "#f87171" },
    { colorName: "blue", primaryValue: "#60a5fa" },
    { colorName: "yellow", primaryValue: "#fbbf24" },
  ];

  test("creates color palettes", () => {
    const colorPalettes = createColorPalettes(colors);
    expect(colorPalettes).toHaveProperty("red");
    expect(colorPalettes).toHaveProperty("blue");
    expect(colorPalettes).toHaveProperty("yellow");
    // @TODO Add more specific assertions based on expected results
  });
});

describe("createVariablesFromColorPalette", () => {
  const colorPalette = {
    red: { 500: "#f87171", 600: "#ed5f5f" },
    blue: { 500: "#60a5fa", 600: "#4e8bdc" },
  };

  test("creates CSS variables from color palette", () => {
    const cssVariables = createVariablesFromColorPalette("css", colorPalette);
    expect(cssVariables).toContain("--red-500: #f87171;");
    expect(cssVariables).toContain("--blue-600: #4e8bdc;");
    // @TODO Add more specific assertions based on expected results
  });

  test("creates SCSS variables from color palette", () => {
    const scssVariables = createVariablesFromColorPalette("scss", colorPalette);
    expect(scssVariables).toContain("$red-500: #f87171;");
    expect(scssVariables).toContain("$blue-600: #4e8bdc;");
    // @TODO Add more specific assertions based on expected results
  });
});

describe("convertColorPaletteToSVG", () => {
  const colorPalette = {
    red: { 500: "#f87171", 600: "#ed5f5f" },
    blue: { 500: "#60a5fa", 600: "#4e8bdc" },
  };

  test("converts color palette to SVG", () => {
    const svg = convertColorPaletteToSVG(colorPalette);
    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
    // @TODO Add more specific assertions based on expected results
  });
});

describe("createColorTheme", () => {
  const colorPalette = {
    red: { 500: "#f87171", 600: "#ed5f5f" },
    blue: { 500: "#60a5fa", 600: "#4e8bdc" },
  };

  test("creates color theme as an object", () => {
    const theme = createColorTheme(colorPalette, "object");
    expect(theme).toHaveProperty("red");
    expect(theme).toHaveProperty("blue");
    // @TODO Add more specific assertions based on expected results
  });

  test("creates color theme as CSS variables", () => {
    const cssVars = createColorTheme(colorPalette, "css-vars");
    expect(cssVars).toContain("--red-500: #f87171;");
    expect(cssVars).toContain("--blue-600: #4e8bdc;");
    // @TODO Add more specific assertions based on expected results
  });

  test("creates color theme as SCSS variables", () => {
    const scssVars = createColorTheme(colorPalette, "scss-vars");
    expect(scssVars).toContain("$red-500: #f87171;");
    expect(scssVars).toContain("$blue-600: #4e8bdc;");
    // @TODO Add more specific assertions based on expected results
  });

  test("creates color theme as an SVG", () => {
    const svg = createColorTheme(colorPalette, "svg");
    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
    // @TODO Add more specific assertions based on expected results
  });
});
