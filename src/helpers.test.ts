import chroma from "chroma-js";
import {
  identifyColorFormat,
  convertColorToFormat,
  generateAlphaShades,
  generateColorShades,
} from "./helpers";

const sampleColor = "#f87171";
const sampleAlphaColor = "#f87171e6";

describe("identifyColorFormat", () => {
  test("identifies hex format", () => {
    expect(identifyColorFormat("#ffffff")).toBe("hex");
    expect(identifyColorFormat("#FFF")).toBe("hex");
    expect(identifyColorFormat("#ffffffaa")).toBe("hex");
  });

  test("identifies rgb format", () => {
    expect(identifyColorFormat("rgb(255, 0, 0)")).toBe("rgb");
    expect(identifyColorFormat("rgb(0, 255, 0)")).toBe("rgb");
    // Add more test cases for valid rgb formats
  });

  test("identifies rgba format", () => {
    expect(identifyColorFormat("rgba(255, 0, 0, 0.5)")).toBe("rgba");
    expect(identifyColorFormat("rgba(0, 255, 0, 1)")).toBe("rgba");
    // Add more test cases for valid rgba formats
  });

  test("identifies hsl format", () => {
    expect(identifyColorFormat("hsl(0, 100%, 50%)")).toBe("hsl");
    expect(identifyColorFormat("hsl(120, 100%, 25%)")).toBe("hsl");
    // Add more test cases for valid hsl formats
  });

  test("identifies hsla format", () => {
    expect(identifyColorFormat("hsla(0, 100%, 50%, 0.5)")).toBe("hsla");
    expect(identifyColorFormat("hsla(120, 100%, 25%, 1)")).toBe("hsla");
    // Add more test cases for valid hsla formats
  });

  test("throws error for invalid format", () => {
    expect(() => identifyColorFormat("invalid-color")).toThrow(
      "Unrecognized color format"
    );
  });
});

describe("convertColorToFormat", () => {
  test("converts color to hex format", () => {
    const hexColor = convertColorToFormat("hex", chroma(sampleColor));
    expect(hexColor).toBe("#f87171");
  });

  test("converts color to rgb format", () => {
    const rgbColor = convertColorToFormat("rgb", chroma(sampleColor));
    expect(rgbColor).toBe("rgb(248,113,113)");
  });

  test("converts color to rgba format", () => {
    const rgbaColor = convertColorToFormat("rgba", chroma(sampleAlphaColor));
    expect(rgbaColor).toBe("rgba(248,113,113,0.9)");
  });

  test("converts color to hsl format", () => {
    const hslColor = convertColorToFormat("hsl", chroma(sampleColor));
    expect(hslColor).toBe("hsl(0,90.6%,70.78%)");
  });

  test("converts color to hsla format", () => {
    const hslaColor = convertColorToFormat("hsla", chroma(sampleAlphaColor));
    expect(hslaColor).toBe("hsla(0,90.6%,70.78%,0.9)");
  });
});

describe("generateAlphaShades", () => {
  test("generates alpha shades", () => {
    const alphaShades = generateAlphaShades(sampleColor, 5);
    expect(alphaShades).toHaveLength(5);
    // @TODO Add more specific assertions based on expected results
  });
});

describe("generateColorShades", () => {
  test("generates color shades", () => {
    const colorShades = generateColorShades(sampleColor, 5);
    expect(colorShades).toHaveLength(5);
    // @TODO Add more specific assertions based on expected results
  });
});
