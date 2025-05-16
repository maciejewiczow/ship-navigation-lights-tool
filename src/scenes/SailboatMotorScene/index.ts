import iconPath from '~/assets/models/sailboat-motor/icon.jpg';
import { SceneDescriptor } from '../sceneDescriptor';
import { lightsDescriptor } from './lights';
import { SailboatMotorScene } from './SailboatMotorScene';

export const descriptor: SceneDescriptor = {
    name: 'Statek o napędzie mechanicznym w drodze',
    id: 'motor-in-route',
    iconPath,
    component: SailboatMotorScene,
    lightsDescriptor,
};
