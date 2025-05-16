import { CurrentScene, SceneParams } from './store';

export enum SceneActionType {
    loadScene = 'scenes/LOAD',
    updateParams = 'scenes/UPDATE_PARAMS',
    updateLightSet = 'scenes/UPDATE_LIGHT_SET',
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
