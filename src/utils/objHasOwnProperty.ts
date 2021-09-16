export const objHasOwnProperty = (object: unknown, propName: string | number | symbol) => (
    ({}).hasOwnProperty.call(object, propName)
);

export const objHasOwnProperties = (object: unknown, propNames: Array<string | number | symbol>): boolean => (
    propNames.reduce<boolean>((result, prop) => result && objHasOwnProperty(object, prop), true)
);
