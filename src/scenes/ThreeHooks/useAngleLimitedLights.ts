import { useFrame, useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import {
    BufferGeometry,
    Mesh,
    MeshStandardMaterial,
    Object3D,
    Vector3,
} from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import { objHasOwnProperties } from 'utils';
import { LightsDescriptor } from './lightsDescriptor';

const directedAngle = (a: Vector3, b: Vector3): number => Math.atan2(a.x * b.z - a.z * b.x, a.x * b.x + a.z * b.z);

export const useAngleLimitedLights = ({ angleLimitedLights }: LightsDescriptor) => {
    const state = useThree();

    const lights = useMemo(() => {
        const { scene } = state;

        const res: Mesh<BufferGeometry, MeshStandardMaterial>[] = [];

        const lightNames = Object.keys(angleLimitedLights);

        scene.traverse(obj => {
            if (!obj.name.startsWith('bow_thing'))
                console.log(obj.name);

            const names = lightNames.filter(lightName => obj.name.startsWith(lightName));
            if (
                obj instanceof Mesh
                    && obj.material instanceof MeshStandardMaterial
                    && names.length > 0
            ) {
                [obj.name] = names;
                res.push(obj);
            }
        });

        for (const light of res) {
            const limits = angleLimitedLights[light.name];
            const name = limits.angleRelativeTo;
            const obj = scene.getObjectByName(name);

            if (!obj)
                console.warn(`AngleRelativeTo: Object with name "${name}" not found in the scene`);
            else
                light.userData.angleRelativeTo = obj;
        }

        console.log(res);
        console.log(scene);
        return res;
    }, [angleLimitedLights, state]);

    useFrame(({ camera }) => {
        const cameraPos = camera.getWorldPosition(new Vector3());

        for (const light of lights) {
            const relativeTo = light.userData.angleRelativeTo as Object3D | undefined;
            const limits = angleLimitedLights[light.name];

            const pos = relativeTo?.getWorldPosition(new Vector3()).setY(0) ?? new Vector3(0, 0, 0);
            const direction = (relativeTo?.getWorldDirection(new Vector3()) ?? new Vector3(1, 0, 0))
                .applyAxisAngle(new Vector3(0, 1, 0), Math.PI / 2);

            const ray = cameraPos.clone().setY(0).sub(pos);
            const angle = directedAngle(ray, direction);

            const minAngle = degToRad(limits.minVisibilityAngleDeg);
            const maxAngle = degToRad(limits.maxVisibilityAngleDeg);

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

// const useSceneEmissiveObjects = () => {
//     const scene = useThree(s => s.scene);

//     return useMemo(() => {
//         const objs: MutableRefObject<Mesh<BufferGeometry, MeshStandardMaterial>>[] = [];

//         scene.traverse(obj => {
//             if (
//                 obj instanceof Mesh
//                 && obj.material instanceof MeshStandardMaterial
//                 && (
//                     obj.material.emissive.r > 0
//                     || obj.material.emissive.g > 0
//                     || obj.material.emissive.b > 0
//                 )
//                 && obj.material.emissiveIntensity > 0
//             )
//                 objs.push({ current: obj });
//         });

//         return objs;
//     }, [scene]);
// };
