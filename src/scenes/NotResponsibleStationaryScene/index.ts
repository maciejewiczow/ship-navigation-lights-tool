import iconPath from '~/assets/models/cargo-ship/not_responsible_not_moving_icon.jpg';
import { SceneDescriptor } from '../sceneDescriptor';
import { NotResponsibleStationaryScene } from './NotResponsibleStationaryScene';
import { sceneDetails } from './scene';

export const descriptor: SceneDescriptor = {
    name: 'Statek nie odpowiadający za swoje ruchy, gdy nie posuwa się po wodzie',
    id: 'not-responsible-stationary',
    iconPath,
    component: NotResponsibleStationaryScene,
    details: sceneDetails,
};
