import iconPath from 'assets/models/cargo-ship/icon.jpg';
import lightsDescriptor from './lights';
import { NotResponsibleStationaryScene } from './NotResponsibleStationaryScene';
import { SceneDescriptor } from '../sceneDescriptor';

export const descriptor: SceneDescriptor = {
    name: 'Statek nie odpowiadający za swoje ruchy, gdy nie posuwa się po wodzie',
    id: 'not-responsible-stationary',
    iconPath: '',
    component: NotResponsibleStationaryScene,
    lightsDescriptor,
};
