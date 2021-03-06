import React, { useLayoutEffect, useMemo, useRef } from 'react';
import {
    extend,
    Overwrite,
    useFrame,
    useLoader,
    useThree,
} from '@react-three/fiber';
import {
    TextureLoader,
    RepeatWrapping,
    Vector3,
    PlaneGeometry,
    Vector2,
    ShaderMaterial,
} from 'three';
import { WaterOptions } from 'three-stdlib';
import defaultWaterNormalsPath from 'assets/waternormals.jpg';
import { Water3D, Water3DOptions } from './Water3D';

// export const useWaterShader = (objName: string) => {
//     const { scene } = useThree();
//     const timeRef = useRef<IUniform<number> | undefined>();

//     const waterNormals = useLoader(TextureLoader, waterNormalsPath);

//     waterNormals.wrapS = RepeatWrapping;
//     waterNormals.wrapT = RepeatWrapping;

//     const waterPlane = scene.getObjectByName(objName);

//     console.log(waterPlane);

//     useEffect(() => {
//         if (waterPlane instanceof Mesh) {
//             console.log('New water');
//             const water = new Water((waterPlane.geometry as BufferGeometry).clone(), {
//                 textureWidth: 512,
//                 textureHeight: 512,
//                 waterNormals,
//                 alpha: 1.0,
//                 sunDirection: new Vector3(),
//                 sunColor: 0xffffff,
//                 waterColor: 0x023e8d,
//                 distortionScale: 3.7,
//                 fog: false,
//             });

//             waterPlane.material = water.material;
//             timeRef.current = (waterPlane.material as ShaderMaterial).uniforms.time;
//             (waterPlane.material as Material).side = DoubleSide;
//         }
//     }, [waterNormals, waterPlane]);

//     useFrame((_, delta) => {
//         if (timeRef.current)
//             timeRef.current.value += delta;
//     });
// };

extend({ Water3D });

interface WaterProps extends Partial<Overwrite<WaterOptions, { waterNormals: string }>> {
    placeholderName: string;
}

const defaultWaterConfig: Partial<Water3DOptions> = {
    textureWidth: 512,
    textureHeight: 512,
    sunDirection: new Vector3(),
    sunColor: 0xaaaaaa,
    waterColor: 0x005896,
    distortionScale: 3.7,
    fog: false,
    waves: [
        {
            direction: new Vector2(1, 0.8),
            steepness: 0.1,
            wavelength: 40,
        },
        {
            direction: new Vector2(1, 0.6),
            steepness: 0.05,
            wavelength: 25,
        },
        {
            direction: new Vector2(1, 1.3),
            steepness: 0.025,
            wavelength: 18,
        },
    ],
};

// TODO: add typing to <water>
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            water3D: any;
        }
    }
}

const waterGeometry = new PlaneGeometry(1e4, 1e4, 1e3 / 4, 1e3 / 4);

export const WaterReplacer: React.FC<WaterProps> = ({ placeholderName, waterNormals: waterNormalsPath, ...rest }) => {
    const ref = useRef<Water3D>();
    const scene = useThree(s => s.scene);
    const waterNormals = useLoader(TextureLoader, waterNormalsPath ?? defaultWaterNormalsPath);
    const placeholder = scene.getObjectByName(placeholderName);

    console.log(scene);

    useLayoutEffect(() => {
        if (placeholder)
            placeholder.visible = false;

        if (ref.current && placeholder) {
            ref.current.position.copy(placeholder.position);
            ref.current.rotation.copy(placeholder.rotation);
            ref.current.rotateX(-Math.PI / 2);
            // ref.current.material.transparent = true;
        }

        return () => {
            if (placeholder)
                placeholder.visible = true;
        };
    }, [placeholder]);

    waterNormals.wrapS = RepeatWrapping;
    waterNormals.wrapT = RepeatWrapping;

    const config = useMemo(
        () => ({
            ...defaultWaterConfig,
            ...rest,
            waterNormals,
        }),
        [rest, waterNormals],
    );

    useFrame((_, delta) => {
        if (ref.current?.material && ref.current?.material instanceof ShaderMaterial)
            ref.current.material.uniforms.time.value += delta;
    });

    return (
        <React.Fragment>
            <water3D ref={ref} args={[waterGeometry, config]} />
            {/* <Plane
                args={[1e4, 1e4, 1e3 / 4, 1e3 / 4]}
                position={placeholder?.position && [placeholder.position.x, placeholder.position.y - 10, placeholder.position.z]}
                rotation-x={-Math.PI / 2}
            >
                <meshPhongMaterial attach="material" color="#000000" />
            </Plane> */}
        </React.Fragment>
    );
};
