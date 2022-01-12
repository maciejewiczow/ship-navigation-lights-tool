import produce from 'immer';
import { Reducer } from 'redux';
import { SceneAction, SceneActionType } from './constants';
import { initialScenesState, SceneState } from './store';

export const scenesReducer: Reducer<SceneState, SceneAction> = (
    state = initialScenesState,
    action,
) => {
    switch (action.type) {
        case SceneActionType.loadScene:
            return {
                ...initialScenesState,
                sceneDesc: {
                    ...action.scene,
                },
            };

        case SceneActionType.updateParams:
            return produce(state, draft => {
                Object.assign(draft.params, action.params);
            });

        default:
            return state;
    }
};
