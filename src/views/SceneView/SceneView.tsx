import React, { Suspense, useEffect } from 'react';
import { Redirect, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from 'components/Loader';
import sceneMap from 'scenes';
import { loadScene, unloadScene } from 'store/Scenes/actions';
import { SceneBase } from 'scenes/SceneBase';
import { Canvas } from 'components/Canvas';
import { Wrapper } from './parts';

interface SceneViewRouteParams {
    id?: string;
}

export const SceneView: React.FC = () => {
    const { id } = useParams<SceneViewRouteParams>();
    const dispatch = useDispatch();

    useEffect(() => {
        if (id && sceneMap.has(id))
            dispatch(loadScene(id));

        return () => {
            if (id && sceneMap.has(id))
                dispatch(unloadScene(id));
        };
    }, [dispatch, id]);

    if (!id || !sceneMap.has(id))
        return <Redirect to="/" />;

    const Model = sceneMap.get(id)?.component ?? React.Fragment;

    return (
        <Wrapper>
            <Suspense fallback={<Loader />}>
                <Canvas camera={{ position: [140, 26, -262], aspect: 70, near: 0.01, far: 100000 }} gl={{ logarithmicDepthBuffer: true }}>
                    <SceneBase sceneId={id}>
                        <Model />
                    </SceneBase>
                </Canvas>
            </Suspense>
        </Wrapper>
    );
};
