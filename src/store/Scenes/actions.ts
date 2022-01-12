import sceneMap from 'scenes';
import { PickAction } from 'store/utils';
import { SceneAction, SceneActionType } from './constants';
import { SceneParams } from './store';

export const loadScene = (id: string): PickAction<SceneAction, SceneActionType.loadScene> => ({
    type: SceneActionType.loadScene,
    name: sceneMap.get(id)!.name,
    id,
});

export const updateSceneParams = (params: Partial<SceneParams>): PickAction<SceneAction, SceneActionType.updateParams> => ({
    type: SceneActionType.updateParams,
    params,
});
