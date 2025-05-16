import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { Config, createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';
import createRootReducer from './reducers';
import { SceneActionType } from './Scenes/constants';
import { createReduxHistoryContext } from 'redux-first-history';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const config: Config = {
    // predicate: action => !(action.type as string).startsWith('@@router'),
    whitelist: [SceneActionType.updateParams],
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
            createStateSyncMiddleware(config) as any,
        ),
    ),
);

initStateWithPrevTab(store);
