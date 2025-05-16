import { SceneDetails } from '~/scenes/threeHooks/sceneDetails';

export const sceneDetails: SceneDetails = {
    angleLimitedLights: {},
    boatObjectName: 'Statek',
    waterObjectName: 'Woda',
    camera: {
        deafultPosition: [140, 26, -262],
        distanceLimits: {
            min: 80,
            max: 1000,
        },
    },
};
