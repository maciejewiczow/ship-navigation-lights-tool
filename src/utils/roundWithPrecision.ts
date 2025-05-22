export const roundWithPrecision = (x: number, precision = 1) =>
    Math.round(x / precision) * precision;
