import { FunctionComponent } from 'react';
import { SceneDetails } from './threeHooks/sceneDetails';

export interface SceneDescriptor {
    name: string;
    id: string;
    iconPath: string;
    component: FunctionComponent;
    details: SceneDetails;
}
