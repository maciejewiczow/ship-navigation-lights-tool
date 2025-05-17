import { defaultDetails, SceneDetails } from '~/scenes/ThreeHooks/sceneDetails';

export const sceneDetails: SceneDetails = {
    ...defaultDetails,
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
