import { SceneDescriptor } from 'scenes/sceneDescriptor';
import { SceneParams, SceneState } from './store';

export enum SceneActionType {
    loadScene = 'scenes/LOAD',
    updateParams = 'scenes/UPDATE_PARAMS',
    updateLightSet = 'scenes/UPDATE_LIGHT_SET',
}

export type SceneAction = {
    type: SceneActionType.loadScene;
    scene: SceneDescriptor;
} | {
    type: SceneActionType.updateParams;
    params: Partial<SceneParams>;
};
