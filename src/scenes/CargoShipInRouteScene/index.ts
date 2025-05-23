import iconPath from '~/assets/models/cargo-ship/icon.jpg';
import { SceneDescriptor } from '../sceneDescriptor';
import { CargoShipInRouteScene } from './CargoShipInRouteScene';
import { sceneDetails } from './scene';

export const descriptor: SceneDescriptor = {
    name: 'Statek o długości powyżej 50m o napędzie mechanicznym w drodze',
    id: 'over-50m-in-route',
    iconPath,
    component: CargoShipInRouteScene,
    details: sceneDetails,
};
