import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Html, useProgress } from '@react-three/drei';
import { Loader } from '~/components/Loader';

export const SceneLoader: React.FC = () => {
    const { active, progress } = useProgress();

    return (
        <Html center>
            <Loader>
                Ładowanie...
                <br />
                {active && (
                    <React.Fragment>
                        {progress.toFixed(0)}%
                        <ProgressBar now={progress} />
                    </React.Fragment>
                )}
            </Loader>
        </Html>
    );
};
