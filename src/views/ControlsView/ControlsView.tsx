import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Controls } from 'components/Controls';
import { currentScene } from 'store/Scenes/selectors';
import { Wrapper } from './parts';

export const ControlsView: React.FC = () => {
    const { id, name } = useSelector(currentScene);

    if (!name || !id)
        return <Redirect to="/" />;

    return (
        <Wrapper>
            <h3>{name}</h3>
            <Controls sceneId={id} />
        </Wrapper>
    );
};
