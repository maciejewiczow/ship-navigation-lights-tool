import iconPath from 'assets/models/sailboat-motor/icon.jpg';
import lightsDescriptor from './lights';
import { SailboatMotorScene } from './SailboatMotorScene';
import { SceneDescriptor } from '../sceneDescriptor';

export const descriptor: SceneDescriptor = {
    name: 'Statek o napędzie mechanicznym w drodze',
    id: 'motor-in-route',
    iconPath,
    component: SailboatMotorScene,
    lightsDescriptor,
};
