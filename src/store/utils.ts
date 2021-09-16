import { Action } from 'redux';

export type PickAction<A extends Action<string>, T extends A['type']> = Extract<A, { type: T }>;

export type AsyncRetT<T> = T extends ((...args: any[]) => Promise<infer R>) ? R : never;
