import { Vector3 } from 'three';

export const directedAngle = (a: Vector3, b: Vector3): number =>
    Math.atan2(a.x * b.z - a.z * b.x, a.x * b.x + a.z * b.z);
