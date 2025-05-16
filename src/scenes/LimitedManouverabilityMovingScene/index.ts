import iconPath from '~/assets/models/cargo-ship/limited_manouverability_moving_icon.jpg';
import { SceneDescriptor } from '../sceneDescriptor';
import { lightsDescriptor } from './lights';
import { LimitedManouverabilityMovingScene } from './LimitedManouverabilityMovingScene';

export const descriptor: SceneDescriptor = {
    name: 'Statek o ograniczonej zdolności manewrowej, gdy posuwa się po wodzie',
    id: 'limited-manouverability-moving',
    iconPath,
    component: LimitedManouverabilityMovingScene,
    lightsDescriptor,
};
