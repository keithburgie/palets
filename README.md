# Palets

A color palette generator for Tailwind, Chakra UI, and more. Quickly create 10- or 11-shade color palettes from a base color and use them as a theme color object, CSS or SCSS variables, or SVG swatches for Figma.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Features

- Generate color palettes for various color systems, such as Tailwind CSS, Chakra UI, and Ant Design.
- Convert colors between different formats, including HEX, RGB, and HSL.
- Generate color shades and alpha variations.
- Create CSS or SCSS variables for easy integration with your stylesheets.
- Generate SVG representations of color palettes for design tools like Figma.

## Installation

You can install My Awesome Color Palette Generator using npm or yarn:

```bash
npm install palets
# or
yarn add palets
```

## Usage

### Importing Modules

To use the color palette generator in your project, import the necessary modules:

```javascript
import {
  createColorPalette,
  createColorPalettes,
  createVariablesFromColorPalette,
} from "palets";
```

### Creating Color Palettes

You can create color palettes with the `createColorPalette` and `createColorPalettes` functions. These functions take color specifications and options as parameters and return color palette objects.

```javascript
const myColor = { colorName: "myColor", primaryValue: "#ff5733" };
const palette = createColorPalette(myColor);
```

### Converting Colors

You can convert colors between different formats using the `convertColorToFormat` function:

```javascript
import { convertColorToFormat } from "palets";

const hexColor = "#ff5733";
const rgbColor = convertColorToFormat("rgb", hexColor);
```

### Creating Variables

To generate CSS or SCSS variables for your color palettes, use the `createVariablesFromColorPalette` function:

```javascript
import { createVariablesFromColorPalette } from "palets";

const myColorPalette = createColorPalette(myColor);
const cssVariables = createVariablesFromColorPalette("css", myColorPalette);
```

### Generating SVGs

You can also create SVG representations of your color palettes for design purposes:

```javascript
import { convertColorPaletteToSVG } from "palets";

const myColorPalette = createColorPalette(myColor);
const svg = convertColorPaletteToSVG(myColorPalette);
```

## Acknowledgments

Features of this project were inspired by the following open-source projects:

- https://uicolors.app
- https://colorbox.io/
- https://www.tints.dev/
- https://smart-swatch.netlify.app/

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
