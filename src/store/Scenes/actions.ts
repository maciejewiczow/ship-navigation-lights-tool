import sceneMap from 'scenes';
import { SceneDescriptor } from 'scenes/sceneDescriptor';
import { PickAction } from 'store/utils';
import { SceneAction, SceneActionType } from './constants';
import { SceneParams } from './store';

export const loadScene = (scene: SceneDescriptor): PickAction<SceneAction, SceneActionType.loadScene> => ({
    type: SceneActionType.loadScene,
    scene,
});

export const updateSceneParams = (params: Partial<SceneParams>): PickAction<SceneAction, SceneActionType.updateParams> => ({
    type: SceneActionType.updateParams,
    params,
});
