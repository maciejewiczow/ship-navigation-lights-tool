import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import * as Views from './views';
import { history } from './store';

const App: React.FC = () => (
    <ConnectedRouter history={history}>
        <Switch>
            <Route path="/" component={Views.LandingView} />
        </Switch>
    </ConnectedRouter>
);

export default App;
