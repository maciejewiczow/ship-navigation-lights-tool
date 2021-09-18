import React, { Suspense } from 'react';
import { Redirect, useParams } from 'react-router';

import { Loader } from 'components/Loader';
import sceneMap from 'scenes';
import { SceneBase } from 'scenes/SceneBase';
import { Canvas } from 'components/Canvas';
import { Wrapper } from './parts';

interface SceneViewRouteParams {
    id?: string;
}

export const SceneView: React.FC = () => {
    const { id } = useParams<SceneViewRouteParams>();

    if (!id || !sceneMap.has(id))
        return <Redirect to="/" />;

    const Model = sceneMap.get(id)?.component ?? React.Fragment;

    return (
        <Wrapper>
            <Suspense fallback={<Loader />}>
                <Canvas camera={{ position: [140, 146, -262], aspect: 70, near: 0.01, far: 100000 }} gl={{ logarithmicDepthBuffer: true }}>
                    <SceneBase sceneId={id}>
                        <Model />
                    </SceneBase>
                </Canvas>
            </Suspense>
        </Wrapper>
    );
};
