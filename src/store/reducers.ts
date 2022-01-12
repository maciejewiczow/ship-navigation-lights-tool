import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';

import { withReduxStateSync } from 'redux-state-sync';
import { AppState } from './constants';
import { scenesReducer } from './Scenes/reducers';

const createRootReducer = (history: History) => withReduxStateSync(
    combineReducers<AppState>({
        router: connectRouter(history),
        currentScene: scenesReducer,
    }),
);

export default createRootReducer;
