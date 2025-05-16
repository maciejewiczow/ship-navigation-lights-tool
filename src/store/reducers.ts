import { combineReducers, Reducer, UnknownAction } from 'redux';
import { withReduxStateSync } from 'redux-state-sync';
import { AppState } from './constants';
import { scenesReducer } from './Scenes/reducers';
import { RouterState } from 'redux-first-history';

const createRootReducer = (routerReducer: Reducer<RouterState, UnknownAction, RouterState>) => withReduxStateSync(
    combineReducers({
        router: routerReducer,
        currentScene: scenesReducer,
    } satisfies Record<keyof AppState, Reducer<any, any, any>>),
);

export default createRootReducer;
