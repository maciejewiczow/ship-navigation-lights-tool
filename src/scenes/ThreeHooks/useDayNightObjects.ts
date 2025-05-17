import { useLayoutEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Object3D } from 'three';
import { currentSceneParams } from '~/store/Scenes/selectors';
import { useCurrentScene } from '~/utils/hooks/useCurrentScene';

export const useDayNightObjects = (model: Object3D | undefined) => {
    const sceneDescriptor = useCurrentScene();
    const { isNight } = useSelector(currentSceneParams);

    const nightSetObject = useMemo(
        () =>
            sceneDescriptor
                ? model?.getObjectByName(
                      sceneDescriptor.details.nightSetObjectName,
                  )
                : undefined,
        [model, sceneDescriptor],
    );

    const daySetObject = useMemo(
        () =>
            sceneDescriptor
                ? model?.getObjectByName(
                      sceneDescriptor.details.daySetObjectName,
                  )
                : undefined,
        [model, sceneDescriptor],
    );

    useLayoutEffect(() => {
        if (isNight) {
            if (nightSetObject) {
                nightSetObject.visible = true;
            }
            if (daySetObject) {
                daySetObject.visible = false;
            }
        } else {
            if (nightSetObject) {
                nightSetObject.visible = false;
            }
            if (daySetObject) {
                daySetObject.visible = true;
            }
        }
    }, [daySetObject, isNight, nightSetObject]);
};
