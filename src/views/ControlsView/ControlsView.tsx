import React from 'react';
import { useSelector } from 'react-redux';
import { Controls } from 'components/Controls';
import { scenesSelector } from 'store/Scenes/selectors';
import { Wrapper } from './parts';

export const ControlsView: React.FC = () => {
    const scenes = useSelector(scenesSelector);

    return (
        <Wrapper>
            {Object.keys(scenes).map(id => (
                <div key={id}>
                    <h3>{id}</h3>
                    <Controls sceneId={id} />
                </div>
            ))}
        </Wrapper>
    );
};
