// TODO: Figure out how to implement scene-specific settings
export interface SceneParams {
    name?: string;
    id?: string;
    isNight: boolean;
    angle: number;
    cameraHeight: number;
    distance: number;
    freeCameraEnabled: boolean;
    backgroundEnabled: boolean;
}

export type SceneState = SceneParams;

export const initialSceneParams: SceneParams = {
    isNight: true,
    angle: Math.PI / 3,
    cameraHeight: 5,
    distance: 200,
    backgroundEnabled: true,
    freeCameraEnabled: true,
};

export const initialScenesState: SceneState = initialSceneParams;
