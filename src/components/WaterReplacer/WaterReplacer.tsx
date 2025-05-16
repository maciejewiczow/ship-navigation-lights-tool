import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import {
    PlaneGeometry,
    RepeatWrapping,
    TextureLoader,
    Vector2,
    Vector3,
} from 'three';
import { WaterOptions } from 'three-stdlib';
import defaultWaterNormalsPath from '~/assets/waternormals.jpg';
import { Water3D as Water3DClass, Water3DOptions } from './Water3D';

const Water3D = extend(Water3DClass);

interface WaterProps
    extends Partial<Overwrite<WaterOptions, { waterNormals: string }>> {
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

const waterGeometry = new PlaneGeometry(1e4, 1e4, 1e3 / 4, 1e3 / 4);

export const WaterReplacer: React.FC<WaterProps> = React.memo(
    ({ placeholderName, waterNormals: waterNormalsPath, ...rest }) => {
        const ref = useRef<Water3DClass>(null);
        const scene = useThree(s => s.scene);
        const waterNormals = useLoader(
            TextureLoader,
            waterNormalsPath ?? defaultWaterNormalsPath,
        );
        const placeholder = useMemo(
            () => scene.getObjectByName(placeholderName),
            [scene, placeholderName],
        );

        useLayoutEffect(() => {
            if (placeholder) {
                placeholder.visible = false;
            }

            if (ref.current && placeholder) {
                ref.current.position.copy(placeholder.position);
                ref.current.rotation.copy(placeholder.rotation);
                ref.current?.rotation.set(-Math.PI / 2, 0, 0);
                // ref.current.material.transparent = true;
            }

            return () => {
                if (placeholder) {
                    placeholder.visible = true;
                }
            };
        }, [placeholder]);

        useLayoutEffect(() => {
            waterNormals.wrapS = RepeatWrapping;
            waterNormals.wrapT = RepeatWrapping;
        }, [waterNormals]);

        const config = useMemo<Water3DOptions>(
            () => ({
                ...defaultWaterConfig,
                ...rest,
                waterNormals,
            }),
            [rest, waterNormals],
        );

        useFrame((_, delta) => {
            if (ref.current?.material) {
                ref.current.material.uniforms.time.value += delta;
            }
        });

        const args = useMemo(() => [waterGeometry, config] as const, [config]);

        return (
            <Water3D
                ref={ref}
                args={args}
            />
        );
    },
);

WaterReplacer.displayName = 'WaterReplacer';
