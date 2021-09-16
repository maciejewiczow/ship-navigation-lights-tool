import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import React, { Suspense, useMemo } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
    ArrowHelper,
    BufferGeometry,
    DoubleSide,
    Mesh,
    MeshStandardMaterial,
    Object3D,
    PerspectiveCamera,
    Vector3,
} from 'three';
import { Environment, OrbitControls } from '@react-three/drei';
import cargoShip from 'assets/models/cargo-ship/carg_ship.glb';
import skybox from 'assets/starry_night.hdr';
import { objHasOwnProperties } from 'utils';
import { degToRad, radToDeg } from 'three/src/math/MathUtils';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Wrapper } from './parts';

const directedAngle = (a: Vector3, b: Vector3): number => Math.atan2(a.x * b.z - a.z * b.x, a.x * b.x + a.z * b.z);

const useAngleLimitedLights = (scene: Object3D) => {
    const lights = useMemo(() => {
        const lightsToAffect: Mesh<BufferGeometry, MeshStandardMaterial>[] = [];

        scene.traverse(obj => {
            if (
                obj instanceof Mesh
                && obj.material instanceof MeshStandardMaterial
                && objHasOwnProperties(obj.userData, ['angleRelativeTo', 'minVisibilityAngleDeg', 'maxVisibilityAngleDeg'])
            )
                lightsToAffect.push(obj);
        });

        for (const light of lightsToAffect) {
            if (typeof light.userData.angleRelativeTo === 'string') {
                const obj = scene.getObjectByName(light.userData.angleRelativeTo);

                if (!obj)
                    console.warn(`AngleRelativeTo: Object with name "${light.userData.angleRelativeTo}" not found in the scene`);
                else
                    light.userData.angleRelativeTo = obj;
            }
        }

        return lightsToAffect;
    }, [scene]);

    useFrame(({ camera, scene: currScene }) => {
        const cameraPos = camera.getWorldPosition(new Vector3());

        for (const light of lights) {
            const relativeTo = light.userData.angleRelativeTo as Object3D;
            const pos = relativeTo.getWorldPosition(new Vector3()).setY(0);
            const direction = relativeTo.getWorldDirection(new Vector3()).applyAxisAngle(new Vector3(0, 1, 0), Math.PI / 2);

            const ray = cameraPos.clone().setY(0).sub(pos);
            const angle = directedAngle(ray, direction);

            const minAngle = degToRad(light.userData.minVisibilityAngleDeg);
            const maxAngle = degToRad(light.userData.maxVisibilityAngleDeg);

            if (minAngle < maxAngle) {
                if (minAngle < angle && angle < maxAngle) {
                    if (!light.visible)
                        light.visible = true;
                } else if (light.visible) {
                    light.visible = false;
                }
            } else if (minAngle < angle || angle < maxAngle) {
                if (!light.visible)
                    light.visible = true;
            } else if (light.visible) {
                light.visible = false;
            }
        }
    });
};

const GLTFModel: React.FC = () => {
    const gltf = useLoader(GLTFLoader, cargoShip);
    const { camera, scene } = useThree();

    // @ts-ignore
    window.content = scene;

    const waterPlane = gltf.scene.getObjectByName('Woda');

    if (waterPlane instanceof Mesh)
        (waterPlane as Mesh<BufferGeometry, MeshStandardMaterial>).material.side = DoubleSide;

    const target = gltf.scene.getObjectByName('Statek')?.position || gltf.scene.position;

    camera.lookAt(target);

    useAngleLimitedLights(gltf.scene);

    return (
        <React.Fragment>
            <primitive object={gltf.scene} />
            <OrbitControls camera={camera} target={target} />
        </React.Fragment>
    );
};

const Scene: React.FC = () => {
    const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 5000);

    camera.position.set(100, 100, 0);

    return (
        <Canvas camera={camera}>
            <GLTFModel />
            {/* <axesHelper scale={[500, 500, 500]} /> */}
            <pointLight intensity={0} position={[0, 300, 0]} />
            <ambientLight intensity={0} />
            <Environment files={skybox} background />
            <EffectComposer>
                <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.1} height={400} />
            </EffectComposer>
        </Canvas>
    );
};

export const LandingView: React.FC = () => (
    <Wrapper>
        <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
            <Scene />
        </Suspense>
    </Wrapper>
);
