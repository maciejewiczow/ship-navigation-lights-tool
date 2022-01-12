import iconPath from 'assets/models/cargo-ship/icon.jpg';
import lightsDescriptor from './lights';
import { LimitedManouverabilityMovingScene } from './LimitedManouverabilityMovingScene';
import { SceneDescriptor } from '../sceneDescriptor';

export const descriptor: SceneDescriptor = {
    name: 'Statek o ograniczonej zdolności manewrowej, gdy posuwa się po wodzie',
    id: 'limited-manouverability-moving',
    iconPath: '',
    component: LimitedManouverabilityMovingScene,
    lightsDescriptor,
};
