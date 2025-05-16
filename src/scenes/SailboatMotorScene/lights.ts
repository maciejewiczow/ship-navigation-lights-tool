import { LightsDescriptor } from '~/scenes/threeHooks/lightsDescriptor';

export const lightsDescriptor: LightsDescriptor = {
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
};
