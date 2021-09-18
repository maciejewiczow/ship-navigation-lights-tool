import { useContextBridge } from '@react-three/drei';
import { Canvas as OriginalCanvas } from '@react-three/fiber';
import React from 'react';
import { Provider, ReactReduxContext } from 'react-redux';
import store from 'store';

export const Canvas: React.FC<React.ComponentProps<typeof OriginalCanvas>> = ({ children, ...props }) => {
    const ContextBridge = useContextBridge(ReactReduxContext);

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <OriginalCanvas {...props}>
            <ContextBridge>
                <Provider store={store}>
                    {children}
                </Provider>
            </ContextBridge>
        </OriginalCanvas>
    );
};
