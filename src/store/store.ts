import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { Config, createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';
import createRootReducer from './reducers';
import { SceneActionType } from './Scenes/constants';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const config: Config = {
    // predicate: action => !(action.type as string).startsWith('@@router'),
    whitelist: [SceneActionType.updateParams],
    prepareState: ({ router, ...state }) => state,
};

export const history = createBrowserHistory({ basename: '/ship-navigation-lights-tool' });

export const store = createStore(
    createRootReducer(history),
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history),
            createStateSyncMiddleware(config),
        ),
    ),
);

initStateWithPrevTab(store);
