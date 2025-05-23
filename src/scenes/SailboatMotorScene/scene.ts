import { defaultDetails, SceneDetails } from '~/scenes/ThreeHooks/sceneDetails';

export const sceneDetails: SceneDetails = {
    ...defaultDetails,
    angleLimitedLights: {
        Burtowe_lewe: {
            angleRelativeTo: 'Statek',
            minVisibilityAngleDeg: -5,
            maxVisibilityAngleDeg: 112.5,
        },
        Burtowe_prawe: {
            angleRelativeTo: 'Statek',
            minVisibilityAngleDeg: -112.5,
            maxVisibilityAngleDeg: 5,
        },
        Masztowe: {
            angleRelativeTo: 'Statek',
            minVisibilityAngleDeg: -112.5,
            maxVisibilityAngleDeg: 112.5,
        },
        Rufowe: {
            angleRelativeTo: 'Statek',
            minVisibilityAngleDeg: 112.5,
            maxVisibilityAngleDeg: -112.5,
        },
    },
    boatObjectName: 'Statek',
    waterObjectName: 'Woda',
    camera: {
        deafultPosition: [-124, 5, -155],
        distanceLimits: {
            min: 30,
            max: 300,
        },
    },
};
