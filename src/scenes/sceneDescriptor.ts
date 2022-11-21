import { FunctionComponent } from 'react';
import { LightsDescriptor } from './threeHooks/lightsDescriptor';

export interface SceneDescriptor {
    name: string;
    id: string;
    iconPath: string;
    component: FunctionComponent;
    lightsDescriptor: LightsDescriptor;
}
