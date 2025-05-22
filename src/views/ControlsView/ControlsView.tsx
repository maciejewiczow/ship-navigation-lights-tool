import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { Controls } from '~/components/Controls';
import { currentSceneDescriptor } from '~/store/Scenes/selectors';
import { BackIcon, BackLink, Wrapper } from './parts';

export const ControlsView: React.FC = () => {
    const scene = useSelector(currentSceneDescriptor);

    if (!scene) {
        return <Navigate to="/" />;
    }

    return (
        <Wrapper>
            <div>
                <BackLink to="..">
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <Button variant="light">
                        <BackIcon />
                        Powrót
                    </Button>
                </BackLink>
            </div>
            <h3>{scene.name}</h3>
            <Controls />
        </Wrapper>
    );
};
