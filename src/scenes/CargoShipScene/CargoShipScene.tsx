import { OrbitControls } from '@react-three/drei';
import { useLoader, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import React, { useEffect } from 'react';
import { useAngleLimitedLights } from 'scenes/ThreeHooks/useAngleLimitedLights';
import { Mesh, BufferGeometry, MeshStandardMaterial, DoubleSide } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import cargoShip from 'assets/models/cargo-ship/carg_ship.glb';

export const CargoShipScene: React.FC = () => {
    const gltf = useLoader(GLTFLoader, cargoShip);
    const { camera, scene } = useThree();

    const target = gltf.scene.getObjectByName('Statek')?.position || gltf.scene.position;

    useEffect(() => {
        // // @ts-ignore
        // window.content = scene;

        const waterPlane = gltf.scene.getObjectByName('Woda');

        if (waterPlane instanceof Mesh)
            (waterPlane as Mesh<BufferGeometry, MeshStandardMaterial>).material.side = DoubleSide;

        camera.lookAt(target);
    }, [camera, gltf.scene, scene, target]);

    useAngleLimitedLights();

    return (
        <primitive name="Loaded scene" object={gltf.scene} />
    );
};
