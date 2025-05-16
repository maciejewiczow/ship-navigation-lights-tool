export interface AngleLimitedLight {
    angleRelativeTo: string;
    minVisibilityAngleDeg: number;
    maxVisibilityAngleDeg: number;
}

export interface SceneDetails {
    angleLimitedLights: Record<string, AngleLimitedLight>;
    boatObjectName: string;
    waterObjectName: string;
    camera: {
        deafultPosition?: [number, number, number];
        distanceLimits: {
            min: number;
            max: number;
        };
    };
}

export const defaultDetails: SceneDetails = {
    angleLimitedLights: {},
    boatObjectName: 'Statek',
    waterObjectName: 'Woda',
    camera: {
        deafultPosition: [140, 26, -262],
        distanceLimits: {
            min: 40,
            max: 1000,
        },
    },
};
