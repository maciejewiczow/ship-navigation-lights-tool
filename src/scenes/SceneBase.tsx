import React, {
    PropsWithChildren,
    useCallback,
    useLayoutEffect,
    useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrbitControls, Sky, useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { debounce } from 'lodash';
import { DoubleSide, Vector3 } from 'three';
import starsEnvFile from '~/assets/starmap.png';
import { WaterReplacer } from '~/components/WaterReplacer';
import { updateSceneParams } from '~/store/Scenes/actions';
import { currentSceneParams } from '~/store/Scenes/selectors';
import { useCurrentScene } from '~/utils/hooks/useCurrentScene';
import { directedAngle } from './directedAngle';
import { defaultDetails } from './ThreeHooks/sceneDetails';

export const SceneBase: React.FC<PropsWithChildren> = ({ children }) => {
    const { scene, camera } = useThree();
    const dispatch = useDispatch();
    const { isNight, backgroundEnabled, freeCameraEnabled, angle, distance } =
        useSelector(currentSceneParams);
    const currentScene = useCurrentScene();

    const skyTexture = useTexture(starsEnvFile);

    const sceneDetails = useCurrentScene()?.details ?? defaultDetails;

    const model = scene.getObjectByName(sceneDetails.boatObjectName);
    const target = useMemo(
        () => model?.position ?? new Vector3(0, 0, 0),
        [model],
    );

    useLayoutEffect(() => {
        if (freeCameraEnabled) {
            return;
        }

        const dir =
            model?.getWorldDirection(new Vector3()) ?? new Vector3(0, 0, 1);

        const len = camera.position.length();
        const pos = dir
            .applyAxisAngle(new Vector3(0, 1, 0), angle - Math.PI / 2)
            .multiplyScalar(len);

        camera.position.copy(pos);

        camera.position.setY(
            currentScene?.details.camera.deafultPosition?.[1] ?? 0,
        );

        camera.position.multiplyScalar(len / camera.position.length());
        camera.position.multiplyScalar(distance / camera.position.length());

        camera.lookAt(target);
    }, [
        model,
        currentScene,
        freeCameraEnabled,
        angle,
        camera,
        target,
        dispatch,
        distance,
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleCameraMovement = useCallback(
        debounce(() => {
            const pos = camera.position;

            const dir =
                model?.getWorldDirection(new Vector3()) ?? new Vector3(0, 0, 1);

            dispatch(
                updateSceneParams({
                    angle:
                        directedAngle(
                            new Vector3(pos.x, 0, pos.z),
                            dir.applyAxisAngle(
                                new Vector3(0, 1, 0),
                                Math.PI / 2,
                            ),
                        ) + Math.PI,
                    distance: pos.length(),
                }),
            );
        }, 200),
        [model],
    );

    return (
        <>
            {children}
            {isNight ? (
                <>
                    <mesh>
                        <sphereGeometry args={[110000]} />
                        <meshStandardMaterial
                            emissive="#030011"
                            emissiveIntensity={2.5}
                            side={DoubleSide}
                        />
                    </mesh>
                    {backgroundEnabled && (
                        <mesh>
                            <sphereGeometry args={[100000]} />
                            <meshBasicMaterial
                                map={skyTexture}
                                opacity={0.8}
                                transparent
                                side={DoubleSide}
                            />
                        </mesh>
                    )}
                </>
            ) : (
                <>
                    <Sky
                        // @ts-expect-error - wrong typings (scale is not in props)
                        scale={10000}
                        inclination={0.65}
                        rayleigh={0.1}
                        mieCoefficient={0.02}
                        azimuth={(3 * Math.PI) / 2}
                        turbidity={0.05}
                    />
                    <WaterReplacer
                        placeholderName={sceneDetails.waterObjectName}
                        waterColor="#000000"
                        sunColor="#222222"
                    />
                    <ambientLight intensity={0.84} />
                    <pointLight
                        position={[100, 100, 100]}
                        intensity={200}
                    />
                </>
            )}
            {freeCameraEnabled && (
                <OrbitControls
                    target={target}
                    enablePan={false}
                    enableDamping={false}
                    rotateSpeed={0.9}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 2 - 0.01}
                    minDistance={sceneDetails.camera.distanceLimits.min}
                    maxDistance={sceneDetails.camera.distanceLimits.max}
                    onChange={handleCameraMovement}
                />
            )}
        </>
    );
};
