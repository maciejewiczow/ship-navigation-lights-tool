export interface ScenesState {
    [key: string]: SceneParams;
}

// TODO: Figure out how to implement scene-specific settings
export interface SceneParams {
    isNight: boolean;
    angle: number;
    cameraHeight: number;
}

export const initialScenesState: ScenesState = {};

export const initialSceneParams: SceneParams = {
    isNight: true,
    angle: Math.PI / 3,
    cameraHeight: 60,
};