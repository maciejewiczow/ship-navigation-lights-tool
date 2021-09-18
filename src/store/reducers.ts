import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';

import { AppState } from './constants';
import { scenesReducer } from './Scenes/reducers';

const createRootReducer = (history: History) => combineReducers<AppState>({
    router: connectRouter(history),
    scenes: scenesReducer,
});

export default createRootReducer;
