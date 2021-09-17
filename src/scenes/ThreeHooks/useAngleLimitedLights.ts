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

const directedAngle = (a: Vector3, b: Vector3): number => Math.atan2(a.x * b.z - a.z * b.x, a.x * b.x + a.z * b.z);

export const useAngleLimitedLights = () => {
    const scene = useThree(state => state.scene);

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

    useFrame(({ camera }) => {
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
