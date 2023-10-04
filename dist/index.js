"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateShadesForBaseColor = exports.shadeValues = void 0;
const chroma_js_1 = __importDefault(require("chroma-js"));
exports.shadeValues = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
];
const generateShadesForBaseColor = (baseColor, desiredShades = exports.shadeValues, outputFormat = "hex") => {
    const lightestShade = (0, chroma_js_1.default)(baseColor instanceof Array ? baseColor.join(",") : baseColor).brighten(3.04);
    const darkestShade = (0, chroma_js_1.default)(baseColor instanceof Array ? baseColor.join(",") : baseColor).darken(2.8);
    // Generate the full spectrum of shades
    const fullSpectrum = chroma_js_1.default
        .scale([
        lightestShade.hex(),
        baseColor instanceof Array ? baseColor.join(",") : baseColor,
        darkestShade.hex(),
    ])
        .colors(exports.shadeValues.length);
    const fullMappedShades = {};
    exports.shadeValues.forEach((shadeValue, i) => {
        let color;
        switch (outputFormat) {
            case "hex":
                color = (0, chroma_js_1.default)(fullSpectrum[i]).hex();
                break;
            case "rgb":
                color = (0, chroma_js_1.default)(fullSpectrum[i]).css();
                break;
            case "hsl":
                color = (0, chroma_js_1.default)(fullSpectrum[i]).css("hsl");
                break;
            case "name":
                color = (0, chroma_js_1.default)(fullSpectrum[i]).name();
                break;
            case "css":
                color = (0, chroma_js_1.default)(fullSpectrum[i]).css();
                break;
            default:
                color = (0, chroma_js_1.default)(fullSpectrum[i]).hex();
        }
        fullMappedShades[shadeValue] = color;
    });
    // Filter down to the desired shades
    const filteredMappedShades = {};
    desiredShades.forEach((shadeValue) => {
        filteredMappedShades[shadeValue] = fullMappedShades[shadeValue];
    });
    return filteredMappedShades;
};
exports.generateShadesForBaseColor = generateShadesForBaseColor;
// Usage
// For the full range
// const fullShades = generateShadesForBaseColor("#ff0000");
// For a narrower range
// const narrowedShades = generateShadesForBaseColor(
//   "#ff0000",
//   [500, 600, 700, 800, 900]
// );
// // For a single shade
// const singleShade = generateShadesForBaseColor("#ff0000", [500]);
