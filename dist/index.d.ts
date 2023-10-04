export type ShadeValue = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
export declare const shadeValues: readonly [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
export type ShadeRange = typeof shadeValues | ShadeValue[];
type ColorInput = string | [number, number, number] | [number, number, number, number];
type ColorOutput = "hex" | "rgb" | "hsl" | "name" | "css";
export type ShadeMapping = {
    [K in ShadeValue]?: string;
};
export declare const generateShadesForBaseColor: (baseColor: ColorInput, desiredShades?: ShadeRange, outputFormat?: ColorOutput) => ShadeMapping;
export {};
