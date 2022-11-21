import React, { useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFrame, useThree } from '@react-three/fiber';
import { Sky, OrbitControls, useTexture } from '@react-three/drei';
import debounce from 'lodash/debounce';
import starsEnvFile from 'assets/starmap.png';
import { currentSceneParams } from 'store/Scenes/selectors';
import { WaterReplacer } from 'components/WaterReplacer';
import { updateSceneParams } from 'store/Scenes/actions';
import { DoubleSide, Vector3 } from 'three';
import sceneMap from 'scenes';
import { useAngleLimitedLights } from './threeHooks/useAngleLimitedLights';
import { emptyDescriptor } from './threeHooks/lightsDescriptor';

interface SceneBaseProps {
    sceneId: string;
}

export const SceneBase: React.FC<SceneBaseProps> = ({ sceneId, children }) => {
    const { scene, camera } = useThree();
    const dispatch = useDispatch();
    const {
        isNight,
        backgroundEnabled,
        freeCameraEnabled,
        cameraHeight,
        angle,
        distance,
    } = useSelector(currentSceneParams);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.scene = scene;
    }, [scene]);

    const skyTexture = useTexture(starsEnvFile);

    const model = scene.getObjectByName('Statek');
    const target = useMemo(() => new Vector3(0, 0, 0), []);

    useAngleLimitedLights(sceneMap.get(sceneId)?.lightsDescriptor ?? emptyDescriptor);

    useLayoutEffect(() => {
        if (!freeCameraEnabled) {
            if (cameraHeight > 60) {
                dispatch(updateSceneParams({
                    cameraHeight: 60,
                }));
            }

            const dir = model?.getWorldDirection(new Vector3()) ?? new Vector3(1, 0, 0);

            const len = camera.position.length();
            const pos = dir
                .applyAxisAngle(new Vector3(0, 1, 0), angle - Math.PI / 2)
                // .applyAxisAngle(camera.position.clone().cross(camera.up), Math.asin(cameraHeight / len));
                .multiplyScalar(len);

            camera.position.copy(pos);

            camera.position.y = cameraHeight;
            camera.position.multiplyScalar(len / camera.position.length());
            camera.position.multiplyScalar(distance / camera.position.length());

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
        distance,
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleCameraMovement = useCallback(
        debounce(() => {
            const pos = camera.position;

            const dir = model?.getWorldDirection(new Vector3()) ?? new Vector3(1, 0, 0);

            dispatch(updateSceneParams({
                angle: new Vector3(pos.x, 0, pos.z).angleTo(dir) + Math.PI / 2,
                cameraHeight: pos.y,
                distance: pos.length(),
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
            {children}
            {isNight ? (
                backgroundEnabled && (
                    <mesh>
                        <sphereBufferGeometry args={[100000]} />
                        <meshBasicMaterial map={skyTexture} side={DoubleSide} />
                    </mesh>
                )
            ) : (
                <React.Fragment>
                    <Sky
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore - wrong typings (scale is not in props)
                        scale={10000}
                        inclination={0.65}
                        rayleigh={0.1}
                        mieCoefficient={0.02}
                        azimuth={(3 * Math.PI) / 2}
                        turbidity={0.05}
                    />
                    <WaterReplacer placeholderName="Woda" waterColor="#000000" sunColor="#222222" />
                    <ambientLight intensity={0.4} />
                    <pointLight position={[100, 100, 100]} />
                </React.Fragment>
            )}
            {freeCameraEnabled && (
                <OrbitControls
                    target={target}
                    enablePan={false}
                    enableDamping={false}
                    rotateSpeed={0.9}
                    maxPolarAngle={Math.PI / 2}
                    minDistance={40}
                    maxDistance={1000}
                    onChange={handleCameraMovement}
                />
            )}
        </React.Fragment>
    );
};
