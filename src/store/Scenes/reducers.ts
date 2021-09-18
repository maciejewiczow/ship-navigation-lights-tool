import produce from 'immer';
import { Reducer } from 'redux';
import { SceneAction, SceneActionType } from './constants';
import { initialSceneParams, initialScenesState, ScenesState } from './store';

export const scenesReducer: Reducer<ScenesState, SceneAction> = (
    state = initialScenesState,
    action,
) => {
    switch (action.type) {
        case SceneActionType.loadScene:
            return {
                ...state,
                [action.id]: { ...initialSceneParams },
            };

        case SceneActionType.unloadScene:
            return produce(state, draft => {
                delete draft[action.id];
            });

        case SceneActionType.updateParams:
            return produce(state, draft => {
                Object.assign(draft[action.id], action.params);
            });

        default:
            return state;
    }
};
