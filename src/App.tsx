import React from 'react';
import { Route, Routes } from 'react-router';
import { HistoryRouter } from 'redux-first-history/rr6'
import * as Views from './views';
import { history } from './store';

const App: React.FC = () => (
    <HistoryRouter history={history}>
        <Routes>
            <Route path="/controls" ><Views.ControlsView /></Route>
            <Route path="/scene/:id" ><Views.SceneView /></Route>
            <Route path="/" ><Views.ListView /></Route>
        </Routes>
    </HistoryRouter>
);

export default App;
