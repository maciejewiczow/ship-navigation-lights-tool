import React from 'react';
import { GeneralScene } from 'scenes/GeneralScene';
import motorBoatPath from 'assets/models/sailboat-motor/sailboat_motor.glb';

export const SailboatMotorScene: React.FC = () => (
    <GeneralScene sceneFilePath={motorBoatPath} />
);
