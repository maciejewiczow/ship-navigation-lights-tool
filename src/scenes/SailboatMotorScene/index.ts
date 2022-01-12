import iconPath from 'assets/models/sailboat-motor/icon.jpg';
import lightsDescriptor from './lights';
import { SailboatMotorScene } from './SailboatMotorScene';
import { SceneDescriptor } from '../sceneDescriptor';

export const descriptor: SceneDescriptor = {
    name: 'Statek o długości powyżej 12m o napędzie mechanicznym w drodze',
    id: 'over-12m-motor-in-route',
    iconPath,
    component: SailboatMotorScene,
    lightsDescriptor,
};
