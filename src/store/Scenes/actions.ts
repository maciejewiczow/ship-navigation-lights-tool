import { PickAction } from 'store/utils';
import { SceneAction, SceneActionType } from './constants';
import { SceneParams } from './store';

export const loadScene = (id: string): PickAction<SceneAction, SceneActionType.loadScene> => ({
    type: SceneActionType.loadScene,
    id,
});

export const unloadScene = (id: string): PickAction<SceneAction, SceneActionType.unloadScene> => ({
    type: SceneActionType.unloadScene,
    id,
});

export const updateSceneParams = (id: string, params: Partial<SceneParams>): PickAction<SceneAction, SceneActionType.updateParams> => ({
    type: SceneActionType.updateParams,
    id,
    params,
});
