import produce from 'immer';
import { Reducer } from 'redux';
import { SceneAction, SceneActionType } from './constants';
import { initialSceneParams, initialScenesState, SceneState } from './store';

export const scenesReducer: Reducer<SceneState, SceneAction> = (
    state = initialScenesState,
    action,
) => {
    switch (action.type) {
        case SceneActionType.loadScene:
            return {
                ...initialSceneParams,
                name: action.name,
                id: action.id,
            };

        case SceneActionType.updateParams:
            return {
                ...state,
                ...action.params,
            };

        default:
            return state;
    }
};
