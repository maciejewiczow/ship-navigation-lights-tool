import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Controls } from 'components/Controls';
import { currentSceneDesc } from 'store/Scenes/selectors';
import { Wrapper } from './parts';

export const ControlsView: React.FC = () => {
    const desc = useSelector(currentSceneDesc);

    if (!desc)
        return <Redirect to="/" />;

    return (
        <Wrapper>
            <h3>{desc.name}</h3>
            <Controls sceneId={desc.id} />
        </Wrapper>
    );
};
