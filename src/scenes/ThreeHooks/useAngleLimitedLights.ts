import { useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
    BufferGeometry,
    Mesh,
    MeshStandardMaterial,
    Object3D,
    Vector3,
} from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';
import { directedAngle } from '~/scenes/directedAngle';
import { SceneDetails } from './sceneDetails';

export const useAngleLimitedLights = (
    angleLimitedLights: SceneDetails['angleLimitedLights'],
    model: Object3D | undefined,
) => {
    const scene = useThree(s => s.scene);

    const lights = useMemo(() => {
        const res: Mesh<BufferGeometry, MeshStandardMaterial>[] = [];

        const lightNames = Object.keys(angleLimitedLights);

        scene.traverse(obj => {
            const name = lightNames.find(lightName =>
                obj.name.toLowerCase().startsWith(lightName.toLowerCase()),
            );
            if (
                obj instanceof Mesh &&
                obj.material instanceof MeshStandardMaterial &&
                name
            ) {
                obj.name = name;
                res.push(obj);
            }
        });

        for (const light of res) {
            const limits = angleLimitedLights[light.name];
            const name = limits.angleRelativeTo;
            const obj = scene.getObjectByName(name);

            if (!obj) {
                console.warn(
                    `AngleRelativeTo: Object with name "${name}" not found in the scene`,
                );
            } else {
                light.userData.angleRelativeTo = obj;
            }
        }

        return res;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [angleLimitedLights, scene, model]);

    useFrame(({ camera }) => {
        const cameraPos = camera.getWorldPosition(new Vector3());

        for (const light of lights) {
            const relativeTo = light.userData.angleRelativeTo as
                | Object3D
                | undefined;
            const limits = angleLimitedLights[light.name];

            const pos =
                relativeTo?.getWorldPosition(new Vector3()).setY(0) ??
                new Vector3(0, 0, 0);
            const direction = (
                relativeTo?.getWorldDirection(new Vector3()) ??
                new Vector3(1, 0, 0)
            ).applyAxisAngle(new Vector3(0, 1, 0), Math.PI / 2);

            const ray = cameraPos.clone().setY(0).sub(pos);
            const angle = directedAngle(ray, direction);

            const minAngle = degToRad(limits.minVisibilityAngleDeg);
            const maxAngle = degToRad(limits.maxVisibilityAngleDeg);

            if (minAngle < maxAngle) {
                if (minAngle < angle && angle < maxAngle) {
                    if (!light.visible) {
                        light.visible = true;
                    }
                } else if (light.visible) {
                    light.visible = false;
                }
            } else if (minAngle < angle || angle < maxAngle) {
                if (!light.visible) {
                    light.visible = true;
                }
            } else if (light.visible) {
                light.visible = false;
            }
        }
    });
};
