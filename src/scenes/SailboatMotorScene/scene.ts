import { SceneDetails } from '~/scenes/threeHooks/sceneDetails';

export const sceneDetails: SceneDetails = {
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
        deafultPosition: [
            -124.83189418215642, 19.658094371074448, -155.01792644914585,
        ],
        distanceLimits: {
            min: 15,
            max: 200,
        },
    },
};
