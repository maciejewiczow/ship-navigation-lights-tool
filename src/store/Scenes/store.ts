import { SceneDescriptor } from '~/scenes/sceneDescriptor';

export interface SceneParams {
    isNight: boolean;
    angle: number;
    distance: number;
    freeCameraEnabled: boolean;
    backgroundEnabled: boolean;
}

export type CurrentScene = Omit<SceneDescriptor, 'component'>;

export interface SceneState {
    params: SceneParams;
    sceneDescriptor?: CurrentScene;
}

export const initialSceneParams: SceneParams = {
    isNight: true,
    angle: Math.PI / 3,
    distance: 200,
    backgroundEnabled: true,
    freeCameraEnabled: true,
};

export const initialScenesState: SceneState = {
    params: initialSceneParams,
};
