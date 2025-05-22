import { CurrentScene, SceneParams } from './store';

export enum SceneActionType {
    loadScene = 'scenes/LOAD',
    updateParams = 'scenes/UPDATE_PARAMS',
}

export type SceneAction =
    | {
          type: SceneActionType.loadScene;
          scene: CurrentScene;
      }
    | {
          type: SceneActionType.updateParams;
          params: Partial<SceneParams>;
      };
