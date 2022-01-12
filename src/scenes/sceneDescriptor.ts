import { FunctionComponent } from 'react';
import { LightsDescriptor } from './ThreeHooks/lightsDescriptor';

export interface SceneDescriptor {
    name: string;
    id: string;
    iconPath: string;
    component: FunctionComponent;
    lightsDescriptor: LightsDescriptor;
}
