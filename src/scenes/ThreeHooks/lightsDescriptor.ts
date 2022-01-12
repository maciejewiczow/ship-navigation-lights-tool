export interface AngleLimitedLight {
    angleRelativeTo: string;
    minVisibilityAngleDeg: number;
    maxVisibilityAngleDeg: number;
}

export interface LightsDescriptor {
    angleLimitedLights: Record<string, AngleLimitedLight>;
}

export const emptyDescriptor: LightsDescriptor = {
    angleLimitedLights: {},
};
