import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';
import {
    Config,
    createStateSyncMiddleware,
    initStateWithPrevTab,
} from 'redux-state-sync';
import { createRootReducer } from './reducers';
import { SceneActionType } from './Scenes/constants';

const composeEnhancers =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const config: Config = {
    // predicate: action => !(action.type as string).startsWith('@@router'),
    whitelist: [SceneActionType.updateParams, SceneActionType.loadScene],
    prepareState: ({ router, ...state }) => state,
};

export const history = createBrowserHistory();

const { routerMiddleware, routerReducer } = createReduxHistoryContext({
    history,
});

export const store = createStore(
    createRootReducer(routerReducer),
    composeEnhancers(
        applyMiddleware(
            routerMiddleware,
            // @ts-expect-error wrong typings for the redux-state-sync
            createStateSyncMiddleware(config),
        ),
    ),
);

initStateWithPrevTab(store);
