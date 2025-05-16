import { SceneDescriptor } from '~/scenes/sceneDescriptor';

// TODO: Figure out how to implement scene-specific settings
export interface SceneParams {
    isNight: boolean;
    angle: number;
    cameraHeight: number;
    distance: number;
    freeCameraEnabled: boolean;
    backgroundEnabled: boolean;
}

export type CurrentScene = Omit<SceneDescriptor, 'component'>;

export interface SceneState {
    params: SceneParams;
    sceneDesc?: CurrentScene;
}

export const initialSceneParams: SceneParams = {
    isNight: true,
    angle: Math.PI / 3,
    cameraHeight: 5,
    distance: 200,
    backgroundEnabled: true,
    freeCameraEnabled: true,
};

export const initialScenesState: SceneState = {
    params: initialSceneParams,
};
