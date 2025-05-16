import React from 'react';
import { Route, Routes } from 'react-router';
import { HistoryRouter } from './HistoryRouter';
import { history } from './store';
import * as Views from './views';

export const App: React.FC = () => (
    <HistoryRouter history={history}>
        <Routes>
            <Route
                path="/controls"
                element={<Views.ControlsView />}
            />
            <Route
                path="/scene/:id"
                element={<Views.SceneView />}
            />
            <Route
                path="/"
                element={<Views.ListView />}
            />
        </Routes>
    </HistoryRouter>
);
