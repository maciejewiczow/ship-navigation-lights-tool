import { Component, FunctionComponent } from 'react';

export interface SceneDescriptor {
    name: string;
    endpoint: string;
    iconPath: string;
    component: FunctionComponent;
}
