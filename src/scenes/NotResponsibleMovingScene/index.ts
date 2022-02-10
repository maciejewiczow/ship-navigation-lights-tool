import iconPath from 'assets/models/cargo-ship/not_responsible_moving_icon.jpg';
import lightsDescriptor from './lights';
import { NotResponsibleMovingScene } from './NotResponsibleMovingScene';
import { SceneDescriptor } from '../sceneDescriptor';

export const descriptor: SceneDescriptor = {
    name: 'Statek nie odpowiadający za swoje ruchy gdy, posuwa się po wodzie',
    id: 'not-responsible-moving',
    iconPath,
    component: NotResponsibleMovingScene,
    lightsDescriptor,
};
