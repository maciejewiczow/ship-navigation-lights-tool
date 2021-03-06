import iconPath from 'assets/models/cargo-ship/icon.jpg';
import lightsDescriptor from './lights';
import { CargoShipInRouteScene } from './CargoShipInRouteScene';
import { SceneDescriptor } from '../sceneDescriptor';

export const descriptor: SceneDescriptor = {
    name: 'Statek o długości powyżej 50m o napędzie mechanicznym w drodze',
    id: 'over-50m-in-route',
    iconPath,
    component: CargoShipInRouteScene,
    lightsDescriptor,
};
