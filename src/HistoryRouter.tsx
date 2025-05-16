import React, { ReactNode, useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';
import { History } from 'history';

export interface HistoryRouterProps {
    basename?: string;
    history: History;
    children?: ReactNode;
}

export const HistoryRouter: React.FC<HistoryRouterProps> = ({
    basename,
    children,
    history,
}) => {
    const [historyState, setHistoryState] = useState({
        action: history.action,
        location: history.location,
    });

    useLayoutEffect(() => history.listen(setHistoryState), [history]);

    return (
        <Router
            basename={basename}
            location={historyState.location}
            navigationType={historyState.action}
            navigator={history}
        >
            {children}
        </Router>
    );
};
