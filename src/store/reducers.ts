import { combineReducers, Reducer, UnknownAction } from 'redux';
import { RouterState } from 'redux-first-history';
import { withReduxStateSync } from 'redux-state-sync';
import { AppState } from './constants';
import { scenesReducer } from './Scenes/reducers';

export const createRootReducer = (
    routerReducer: Reducer<RouterState, UnknownAction, RouterState>,
) =>
    withReduxStateSync(
        combineReducers({
            router: routerReducer,
            currentScene: scenesReducer,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } satisfies Record<keyof AppState, Reducer<any, any, any>>),
    );
