import React, { Suspense, useEffect, useMemo } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Redirect, useParams } from 'react-router';
import { BufferGeometry, DoubleSide, Mesh, MeshStandardMaterial } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import starsPx from 'assets/Real Stars Skybox/px.png';
import starsNx from 'assets/Real Stars Skybox/nx.png';
import starsPy from 'assets/Real Stars Skybox/py.png';
import starsNy from 'assets/Real Stars Skybox/ny.png';
import starsPz from 'assets/Real Stars Skybox/pz.png';
import starsNz from 'assets/Real Stars Skybox/nz.png';
import { Loader } from 'components/Loader';
import { useAngleLimitedLights } from 'scenes/ThreeHooks/useAngleLimitedLights';
import sceneMap from 'scenes';
import { Wrapper } from './parts';

interface SceneViewRouteParams {
    id?: string;
}

const SceneBase: React.FC = ({ children }) => {
    const { scene, camera } = useThree();

    const target = useMemo(() => scene.getObjectByName('Loaded scene')?.position, [scene]);

    useAngleLimitedLights();

    return (
        <React.Fragment>
            { children }
            {/* <axesHelper scale={[500, 500, 500]} /> */}
            <Environment files={[starsPx, starsNx, starsPy, starsNy, starsPz, starsNz]} background />
            <OrbitControls camera={camera} target={target} />
            <ambientLight intensity={0} />
            <EffectComposer>
                <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.1} />
            </EffectComposer>
        </React.Fragment>
    );
};

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
