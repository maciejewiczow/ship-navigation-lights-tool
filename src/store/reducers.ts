import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';

import { AppState } from './constants';

const createRootReducer = (history: History) => combineReducers<AppState>({
    router: connectRouter(history),
});

export default createRootReducer;
