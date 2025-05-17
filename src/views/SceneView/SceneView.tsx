import React, { Suspense, useEffect, useState } from 'react';
import { AiOutlineControl } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router';
import { lightSetParamName, noControlsParamName } from '~/appConstants';
import { Canvas } from '~/components/Canvas';
import { SceneBase } from '~/scenes/SceneBase';
import { loadScene } from '~/store/Scenes/actions';
import { useQueryParams } from '~/utils/hooks';
import { useCurrentScene } from '~/utils/hooks/useCurrentScene';
import { Controls, ControlsDrawer, DrawerHandle, Wrapper } from './parts';
import { SceneLoader } from './SceneLoader';

export type SceneViewRouteParams = {
    id?: string;
};

export const SceneView: React.FC = () => {
    const [areControlsOpen, setAreControlsOpen] = useState(false);
    const dispatch = useDispatch();
    const queryParams = useQueryParams();
    const descriptor = useCurrentScene();

    useEffect(() => {
        if (descriptor && queryParams.has(lightSetParamName)) {
            // Checked if it is not null just above
            dispatch(loadScene(descriptor));
        }
        // this effect should not trigger if scenes are modified
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, descriptor]);

    if (!descriptor) {
        return <Navigate to="/" />;
    }

    const Model = descriptor?.component ?? React.Fragment;

    return (
        <Wrapper>
            {!queryParams.has(noControlsParamName) && (
                <ControlsDrawer
                    open={areControlsOpen}
                    handleHeight={40}
                >
                    <Controls />
                    <DrawerHandle
                        onClick={() => setAreControlsOpen(state => !state)}
                        title="Ustawienia sceny"
                    >
                        <AiOutlineControl />
                    </DrawerHandle>
                </ControlsDrawer>
            )}
            <Canvas
                camera={{
                    position: descriptor?.details.camera.deafultPosition ?? [
                        140, 26, -262,
                    ],
                    fov: 70,
                    near: 0.01,
                    far: 100000,
                }}
                gl={{ logarithmicDepthBuffer: true }}
            >
                <Suspense fallback={<SceneLoader />}>
                    <SceneBase>
                        <Model />
                    </SceneBase>
                </Suspense>
            </Canvas>
        </Wrapper>
    );
};
