export interface AngleLimitedLight {
    angleRelativeTo: string;
    minVisibilityAngleDeg: number;
    maxVisibilityAngleDeg: number;
}

export interface SceneDetails {
    angleLimitedLights: Record<string, AngleLimitedLight>;
    boatObjectName: string;
    waterObjectName: string;
}

export const emptyDetails: SceneDetails = {
    angleLimitedLights: {},
    boatObjectName: 'Statek',
    waterObjectName: 'Woda',
};
