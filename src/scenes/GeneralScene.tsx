import React, { useEffect } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { DoubleSide, Mesh, MeshBasicMaterial } from 'three';
import { GLTFLoader } from 'three-stdlib';
import { useAngleLimitedLights } from './ThreeHooks/useAngleLimitedLights';

export interface GeneralSceneProps {
    sceneFilePath: string;
    shipObjectName?: string;
    waterObjectName?: string;
}

export const GeneralScene: React.FC<GeneralSceneProps> = ({
    sceneFilePath,
    shipObjectName = 'Statek',
    waterObjectName = 'Woda',
}) => {
    const camera = useThree(s => s.camera);
    const gltf = useLoader(GLTFLoader, sceneFilePath);

    useEffect(() => {
        const water = gltf.scene.getObjectByName(waterObjectName);

        if (water instanceof Mesh) {
            (water.material as MeshBasicMaterial).side = DoubleSide;
        }

        const target =
            gltf.scene.getObjectByName(shipObjectName)?.position ??
            gltf.scene.position;

        camera.lookAt(target);
    }, [camera, gltf, shipObjectName, waterObjectName]);

    useAngleLimitedLights(gltf.scene);

    return (
        <primitive
            name="Loaded scene"
            object={gltf.scene}
        />
    );
};
