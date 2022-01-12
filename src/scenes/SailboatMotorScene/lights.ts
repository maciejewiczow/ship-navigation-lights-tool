import { LightsDescriptor } from 'scenes/ThreeHooks/lightsDescriptor';

export default {
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
        Topowe: {
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
} as LightsDescriptor;
