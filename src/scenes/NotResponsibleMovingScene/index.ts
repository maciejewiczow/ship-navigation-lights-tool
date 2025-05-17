import iconPath from '~/assets/models/cargo-ship/not_responsible_moving_icon.jpg';
import { SceneDescriptor } from '../sceneDescriptor';
import { NotResponsibleMovingScene } from './NotResponsibleMovingScene';
import { sceneDetails } from './scene';

export const descriptor: SceneDescriptor = {
    name: 'Statek o długości powyżej 50m nie odpowiadający za swoje ruchy gdy, posuwa się po wodzie',
    id: 'not-responsible-moving',
    iconPath,
    component: NotResponsibleMovingScene,
    details: sceneDetails,
};
