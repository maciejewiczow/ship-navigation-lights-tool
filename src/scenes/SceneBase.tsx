import React, { useLayoutEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, Sky, OrbitControls } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import debounce from 'lodash/debounce';
import starsPx from 'assets/Real Stars Skybox/px.png';
import starsNx from 'assets/Real Stars Skybox/nx.png';
import starsPy from 'assets/Real Stars Skybox/py.png';
import starsNy from 'assets/Real Stars Skybox/ny.png';
import starsPz from 'assets/Real Stars Skybox/pz.png';
import starsNz from 'assets/Real Stars Skybox/nz.png';
import { sceneParams } from 'store/Scenes/selectors';
import { WaterReplacer } from 'components/WaterReplacer';
import { updateSceneParams } from 'store/Scenes/actions';
import { Event, Vector3 } from 'three';
import { useAngleLimitedLights } from './ThreeHooks/useAngleLimitedLights';

interface SceneBaseProps {
    sceneId: string;
}

export const SceneBase: React.FC<SceneBaseProps> = ({ sceneId, children }) => {
    const { scene, camera } = useThree();
    const dispatch = useDispatch();
    const { isNight, backgroundEnabled, freeCameraEnabled, cameraHeight, angle } = useSelector(sceneParams(sceneId));

    const model = scene.getObjectByName('Statek');
    const target = useMemo(() => new Vector3(0, 0, 0), []);

    useAngleLimitedLights();

    useLayoutEffect(() => {
        if (!freeCameraEnabled) {
            if (cameraHeight > 60) {
                dispatch(updateSceneParams(sceneId, {
                    cameraHeight: 60,
                }));
            }

            const dir = model?.getWorldDirection(new Vector3()) ?? new Vector3(1, 0, 0);

            const len = camera.position.length();
            const pos = dir
                .applyAxisAngle(new Vector3(0, 1, 0), angle)
                // .applyAxisAngle(camera.position.clone().cross(camera.up), Math.asin(cameraHeight / len));
                .multiplyScalar(len);

            camera.position.copy(pos);

            camera.position.y = cameraHeight;
            camera.position.multiplyScalar(len / camera.position.length());

            camera.lookAt(target);
        }
    }, [
        model,
        freeCameraEnabled,
        angle,
        camera,
        cameraHeight,
        target,
        sceneId,
        dispatch,
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleCameraMovement = useCallback(
        debounce(() => {
            const pos = camera.position;

            const dir = model?.getWorldDirection(new Vector3()) ?? new Vector3(1, 0, 0);

            dispatch(updateSceneParams({
                angle: new Vector3(pos.x, 0, pos.z).angleTo(dir) + Math.PI / 2,
                cameraHeight: pos.y,
            }));
        }, 200),
        [],
    );

    useFrame(() => {
        if (camera.position.y < 3)
            camera.position.y = 3;
    });

    return (
        <React.Fragment>
            { children }
            {/* <axesHelper scale={[500, 500, 500]} /> */}
            <EffectComposer depthBuffer autoClear disableNormalPass>
                {isNight ? <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.1} /> : <React.Fragment />}
            </EffectComposer>
            {isNight ? (
                <React.Fragment>
                    {backgroundEnabled && <Environment files={[starsPx, starsNx, starsPy, starsNy, starsPz, starsNz]} background />}
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Sky scale={10000} inclination={0.65} rayleigh={0.1} mieCoefficient={0.02} azimuth={(3 * Math.PI) / 2} turbidity={0.05} />
                    <WaterReplacer placeholderName="Woda" waterColor="#000000" sunColor="#222222" />
                    <ambientLight intensity={0.4} />
                    <pointLight position={[100, 100, 100]} />
                    {/* <pointLight position={[-100, -100, -100]} /> */}
                </React.Fragment>
            )}
            {freeCameraEnabled && (
                <OrbitControls
                    camera={camera}
                    target={target}
                    enablePan={false}
                    enableDamping={false}
                    rotateSpeed={0.9}
                    maxPolarAngle={Math.PI / 2}
                    minDistance={40}
                    maxDistance={5200}
                    onChange={handleCameraMovement}
                />
            )}
        </React.Fragment>
    );
};
