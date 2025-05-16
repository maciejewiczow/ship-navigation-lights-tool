import React, { useEffect, useMemo } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { DoubleSide, Mesh, MeshBasicMaterial } from 'three';
import { GLTFLoader } from 'three-stdlib';

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
    const camera = useThree(x => x.camera);
    const gltf = useLoader(GLTFLoader, sceneFilePath);

    const target = useMemo(
        () =>
            gltf.scene.getObjectByName(shipObjectName)?.position ??
            gltf.scene.position,
        [gltf.scene, shipObjectName],
    );

    useEffect(() => {
        const water = gltf.scene.getObjectByName(waterObjectName);

        if (water instanceof Mesh) {
            (water.material as MeshBasicMaterial).side = DoubleSide;
        }

        camera.lookAt(target);
    }, [camera, target, gltf, waterObjectName]);

    return (
        <primitive
            name="Loaded scene"
            object={gltf.scene}
        />
    );
};
