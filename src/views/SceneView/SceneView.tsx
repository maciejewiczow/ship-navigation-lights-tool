import React, { Suspense, useEffect, useState } from 'react';
import { AiOutlineControl } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router';
import { lightSetParamName, noControlsParamName } from '~/appConstants';
import { Canvas } from '~/components/Canvas';
import { sceneMap } from '~/scenes';
import { SceneBase } from '~/scenes/SceneBase';
import { loadScene } from '~/store/Scenes/actions';
import { useQueryParams } from '~/utils/hooks';
import { Controls, ControlsDrawer, DrawerHandle, Wrapper } from './parts';
import { SceneLoader } from './SceneLoader';

type SceneViewRouteParams = {
    id?: string;
};

export const SceneView: React.FC = () => {
    const { id } = useParams<SceneViewRouteParams>();
    const [areControlsOpen, setAreControlsOpen] = useState(false);
    const dispatch = useDispatch();
    const queryParams = useQueryParams();

    useEffect(() => {
        if (id && sceneMap.has(id) && queryParams.has(lightSetParamName)) {
            // Checked if it is not null just above
            dispatch(loadScene(sceneMap.get(id)!));
        }

        // this effect should not trigger if scenes are modified
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, id]);

    if (!id || !sceneMap.has(id)) {
        return <Navigate to="/" />;
    }

    const Model = sceneMap.get(id)?.component ?? React.Fragment;

    return (
        <Wrapper>
            {!queryParams.has(noControlsParamName) && (
                <ControlsDrawer
                    open={areControlsOpen}
                    handleHeight={40}
                >
                    <Controls sceneId={id} />
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
                    position: [140, 26, -262],
                    aspect: 70,
                    near: 10,
                    far: 1000000,
                }}
                // gl={{ logarithmicDepthBuffer: true }}
            >
                <Suspense fallback={<SceneLoader />}>
                    <SceneBase sceneId={id}>
                        <Model />
                    </SceneBase>
                </Suspense>
            </Canvas>
        </Wrapper>
    );
};
