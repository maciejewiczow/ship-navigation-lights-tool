import iconPath from '~/assets/models/cargo-ship/limited_manouverability_moving_icon.jpg';
import { SceneDescriptor } from '../sceneDescriptor';
import { LimitedManouverabilityMovingScene } from './LimitedManouverabilityMovingScene';
import { sceneDetails } from './scene';

export const descriptor: SceneDescriptor = {
    name: 'Statek o długości powyżej 50 i ograniczonej zdolności manewrowej, gdy posuwa się po wodzie',
    id: 'limited-manouverability-moving',
    iconPath,
    component: LimitedManouverabilityMovingScene,
    details: sceneDetails,
};
