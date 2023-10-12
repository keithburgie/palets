import chroma from "chroma-js";
export const shadeValues = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
];
export const generateShadesForBaseColor = (baseColor, desiredShades = shadeValues, outputFormat = "hex") => {
    const lightestShade = chroma(baseColor instanceof Array ? baseColor.join(",") : baseColor).brighten(3.04);
    const darkestShade = chroma(baseColor instanceof Array ? baseColor.join(",") : baseColor).darken(2.8);
    // Generate the full spectrum of shades
    const fullSpectrum = chroma
        .scale([
        lightestShade.hex(),
        baseColor instanceof Array ? baseColor.join(",") : baseColor,
        darkestShade.hex(),
    ])
        .colors(shadeValues.length);
    const fullMappedShades = {};
    shadeValues.forEach((shadeValue, i) => {
        let color;
        switch (outputFormat) {
            case "hex":
                color = chroma(fullSpectrum[i]).hex();
                break;
            case "rgb":
                color = chroma(fullSpectrum[i]).css();
                break;
            case "hsl":
                color = chroma(fullSpectrum[i]).css("hsl");
                break;
            case "name":
                color = chroma(fullSpectrum[i]).name();
                break;
            case "css":
                color = chroma(fullSpectrum[i]).css();
                break;
            default:
                color = chroma(fullSpectrum[i]).hex();
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
