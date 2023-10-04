import { generateShadesForBaseColor, ShadeValue, ShadeMapping } from "../src";

describe("generateShadesForBaseColor", () => {
  it("generates shades for a base color in hex format by default", () => {
    const shades = generateShadesForBaseColor("#ff0000");
    const expected: ShadeMapping = {
      50: expect.stringMatching(/^#[0-9a-fA-F]{6}$/),
      100: expect.stringMatching(/^#[0-9a-fA-F]{6}$/),
      // Add expected values for other shade values here
    };
    expect(shades).toMatchObject(expected);
  });

  it("generates shades for a base color in rgb format", () => {
    const shades = generateShadesForBaseColor("#ff0000", undefined, "rgb");
    const expected: ShadeMapping = {
      50: expect.stringMatching(/^rgb\(\d+, \d+, \d+\)$/),
      100: expect.stringMatching(/^rgb\(\d+, \d+, \d+\)$/),
      // Add expected values for other shade values here
    };
    expect(shades).toMatchObject(expected);
  });

  it("generates shades for a base color in hsl format", () => {
    const shades = generateShadesForBaseColor("#ff0000", undefined, "hsl");
    const expected: ShadeMapping = {
      50: expect.stringMatching(/^hsl\(\d+, \d+%, \d+%\)$/),
      100: expect.stringMatching(/^hsl\(\d+, \d+%, \d+%\)$/),
      // Add expected values for other shade values here
    };
    expect(shades).toMatchObject(expected);
  });

  it("generates shades for a base color in name format", () => {
    const shades = generateShadesForBaseColor("#ff0000", undefined, "name");
    const expected: ShadeMapping = {
      50: "red",
      100: "red",
      // Add expected values for other shade values here
    };
    expect(shades).toMatchObject(expected);
  });

  it("generates shades for a base color in css format (default)", () => {
    const shades = generateShadesForBaseColor("#ff0000", undefined, "css");
    const expected: ShadeMapping = {
      50: expect.stringMatching(/^#[0-9a-fA-F]{6}$/),
      100: expect.stringMatching(/^#[0-9a-fA-F]{6}$/),
      // Add expected values for other shade values here
    };
    expect(shades).toMatchObject(expected);
  });

  it("generates shades for a base color with a custom range", () => {
    const shades = generateShadesForBaseColor("#ff0000", [200, 400, 800]);
    const expected: ShadeMapping = {
      200: expect.stringMatching(/^#[0-9a-fA-F]{6}$/),
      400: expect.stringMatching(/^#[0-9a-fA-F]{6}$/),
      800: expect.stringMatching(/^#[0-9a-fA-F]{6}$/),
    };
    expect(shades).toMatchObject(expected);
  });

  it("generates shades for an RGB base color", () => {
    const shades = generateShadesForBaseColor([255, 0, 0]);
    const expected: ShadeMapping = {
      50: expect.stringMatching(/^#[0-9a-fA-F]{6}$/),
      100: expect.stringMatching(/^#[0-9a-fA-F]{6}$/),
      // Add expected values for other shade values here
    };
    expect(shades).toMatchObject(expected);
  });

  it("generates shades for an RGBA base color", () => {
    const shades = generateShadesForBaseColor([255, 0, 0, 0.5]);
    const expected: ShadeMapping = {
      50: expect.stringMatching(/^rgba\(\d+, \d+, \d+, 0.\d+\)$/),
      100: expect.stringMatching(/^rgba\(\d+, \d+, \d+, 0.\d+\)$/),
      // Add expected values for other shade values here
    };
    expect(shades).toMatchObject(expected);
  });

  it("generates shades for a single shade value", () => {
    const shades = generateShadesForBaseColor("#ff0000", [500]);
    const expected: ShadeMapping = {
      500: expect.stringMatching(/^#[0-9a-fA-F]{6}$/),
    };
    expect(shades).toMatchObject(expected);
  });

  it("generates shades for a custom range with a single shade value", () => {
    const shades = generateShadesForBaseColor("#ff0000", [500, 500]);
    const expected: ShadeMapping = {
      500: expect.stringMatching(/^#[0-9a-fA-F]{6}$/),
    };
    expect(shades).toMatchObject(expected);
  });

  // Add more test cases as needed
});
