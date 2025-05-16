declare global {
    type PickAction<A extends Action<string>, T extends A['type']> = Extract<
        A,
        { type: T }
    >;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type AsyncRetT<T> = T extends (...args: any[]) => Promise<infer R>
        ? R
        : never;

    type Overwrite<T, U extends { [key: keyof T]: unknown }> = Omit<
        T,
        keyof U
    > &
        U;
}

export {};
