import React, { Suspense, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineControl } from 'react-icons/ai';
import { Loader } from 'components/Loader';
import sceneMap from 'scenes';
import { loadScene } from 'store/Scenes/actions';
import { scenesSelector } from 'store/Scenes/selectors';
import { SceneBase } from 'scenes/SceneBase';
import { Canvas } from 'components/Canvas';
import { useQueryParams } from 'utils/hooks';
import { objHasOwnProperty } from 'utils';
import {
    ControlsDrawer,
    DrawerHandle,
    Wrapper,
    Controls,
    Html,
} from './parts';

interface SceneViewRouteParams {
    id?: string;
}

export const SceneView: React.FC = () => {
    const { id } = useParams<SceneViewRouteParams>();
    const [areControlsOpen, setAreControlsOpen] = useState(false);
    const scenes = useSelector(scenesSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (id && sceneMap.has(id) && !objHasOwnProperty(scenes, id))
            dispatch(loadScene(id));

    // this effect shoudl not trigger if scenes are modified
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, id]);

    const queryParams = useQueryParams();

    if (!id || !sceneMap.has(id))
        return <Redirect to="/" />;

    const Model = sceneMap.get(id)?.component ?? React.Fragment;

    return (
        <Wrapper>
            {!queryParams.has('noControls') && (
                <ControlsDrawer open={areControlsOpen} handleHeight={40}>
                    <Controls sceneId={id} />
                    <DrawerHandle
                        onClick={() => setAreControlsOpen(state => !state)}
                        title="Ustawienia sceny"
                    >
                        <AiOutlineControl />
                    </DrawerHandle>
                </ControlsDrawer>
            )}
            <Canvas camera={{ position: [140, 26, -262], aspect: 70, near: 0.01, far: 100000 }} gl={{ logarithmicDepthBuffer: true }}>
                <Suspense fallback={<Html center><Loader /></Html>}>
                    <SceneBase sceneId={id}>
                        <Model />
                    </SceneBase>
                </Suspense>
            </Canvas>
        </Wrapper>
    );
};
