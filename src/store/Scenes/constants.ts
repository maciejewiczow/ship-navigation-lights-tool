import { SceneParams } from './store';

export enum SceneActionType {
    loadScene = 'scenes/LOAD',
    unloadScene = 'scenes/UNLOAD',
    updateParams = 'scenes/UPDATE_PARAMS',
}

export type SceneAction = {
    type: SceneActionType.loadScene;
    id: string;
} | {
    type: SceneActionType.unloadScene;
    id: string;
} | {
    type: SceneActionType.updateParams;
    id: string;
    params: Partial<SceneParams>;
};
