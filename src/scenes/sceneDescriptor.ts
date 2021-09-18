import { FunctionComponent } from 'react';

export interface SceneDescriptor {
    name: string;
    id: string;
    iconPath: string;
    component: FunctionComponent;
}
