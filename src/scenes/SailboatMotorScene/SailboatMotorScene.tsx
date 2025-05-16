import React from 'react';
import motorBoatPath from '~/assets/models/sailboat-motor/sailboat_motor.glb';
import { GeneralScene } from '~/scenes/GeneralScene';

export const SailboatMotorScene: React.FC = () => (
    <GeneralScene sceneFilePath={motorBoatPath} />
);
