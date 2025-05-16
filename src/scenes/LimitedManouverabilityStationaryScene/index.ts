import iconPath from '~/assets/models/cargo-ship/limited_manouverability_not_moving_icon.jpg';
import { SceneDescriptor } from '../sceneDescriptor';
import { lightsDescriptor } from './lights';
import { LimitedManouverabilityStationaryScene } from './LimitedManouverabilityStationaryScene';

export const descriptor: SceneDescriptor = {
    name: 'Statek o ograniczonej zdolności manewrowej, gdy nie posuwa się po wodzie',
    id: 'limited-manouverability-stationary',
    iconPath,
    component: LimitedManouverabilityStationaryScene,
    lightsDescriptor,
};
