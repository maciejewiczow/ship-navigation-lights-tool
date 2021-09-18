import React, { useEffect } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';

import cargoShip from 'assets/models/cargo-ship/carg_ship.glb';
import { DoubleSide, Mesh, MeshBasicMaterial } from 'three';

export const CargoShipScene: React.FC = () => {
    const { camera, scene } = useThree();
    const gltf = useLoader(GLTFLoader, cargoShip);

    const target = gltf.scene.getObjectByName('Statek')?.position || gltf.scene.position;

    // useWaterShader('Woda');

    useEffect(() => {
        // @ts-ignore
        window.content = scene;

        const water = scene.getObjectByName('Woda');

        if (water instanceof Mesh)
            (water.material as MeshBasicMaterial).side = DoubleSide;

        camera.lookAt(target);
    }, [camera, scene, target]);

    return (
        <React.Fragment>
            <primitive name="Loaded scene" object={gltf.scene} />
        </React.Fragment>
    );
};
