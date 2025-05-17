import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { sceneMap } from '~/scenes';
import { SceneDescriptor } from '~/scenes/sceneDescriptor';
import { SceneViewRouteParams } from '~/views/SceneView/SceneView';

export const useCurrentScene = (): SceneDescriptor | undefined => {
    const { id } = useParams<SceneViewRouteParams>();

    return useMemo(() => (id ? sceneMap.get(id) : undefined), [id]);
};
