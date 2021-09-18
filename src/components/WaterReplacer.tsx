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
    ShaderMaterial,
    PlaneGeometry,
} from 'three';
import { Water as ThreeWater, WaterOptions } from 'three-stdlib';
import defaultWaterNormalsPath from 'assets/waternormals.jpg';

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

extend({ ThreeWater });

interface WaterProps extends Partial<Overwrite<WaterOptions, { waterNormals: string }>> {
    placeholderName: string;
}

const defaultWaterConfig: Partial<WaterOptions> = {
    textureWidth: 512,
    textureHeight: 512,
    sunDirection: new Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 3.7,
    fog: false,
};

// TODO: add typing to <threeWater>
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            threeWater: any;
        }
    }
}

const waterGeometry = new PlaneGeometry(10000, 10000);

export const WaterReplacer: React.FC<WaterProps> = ({ placeholderName, waterNormals: waterNormalsPath, ...rest }) => {
    const ref = useRef<ThreeWater>();
    const scene = useThree(s => s.scene);
    const waterNormals = useLoader(TextureLoader, waterNormalsPath ?? defaultWaterNormalsPath);
    const placeholder = scene.getObjectByName(placeholderName);

    useLayoutEffect(() => {
        if (placeholder) {
            console.log('Making placeholder invisible', placeholder, ref);
            placeholder.visible = false;
        }

        if (ref.current && placeholder) {
            ref.current.position.copy(placeholder.position);
            ref.current.rotation.copy(placeholder.rotation);
            ref.current.rotateX(-Math.PI / 2);
        }

        return () => {
            if (placeholder) {
                console.log('Making placegolder visible again');
                placeholder.visible = true;
            }
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
        if (ref.current?.material)
            (ref.current.material as ShaderMaterial).uniforms.time.value += delta;
    });

    return <threeWater ref={ref} args={[waterGeometry, config]} />;
};
