import iconPath from '~/assets/models/sailboat-motor/icon.jpg';
import { SceneDescriptor } from '../sceneDescriptor';
import { SailboatMotorScene } from './SailboatMotorScene';
import { sceneDetails } from './scene';

export const descriptor: SceneDescriptor = {
    name: 'Statek o napędzie mechanicznym w drodze',
    id: 'motor-in-route',
    iconPath,
    component: SailboatMotorScene,
    details: sceneDetails,
};
