import { SceneParams } from './store';

export enum SceneActionType {
    loadScene = 'scenes/LOAD',
    updateParams = 'scenes/UPDATE_PARAMS',
}

export type SceneAction = {
    type: SceneActionType.loadScene;
    name: string;
    id: string;
} | {
    type: SceneActionType.updateParams;
    params: Partial<SceneParams>;
};
