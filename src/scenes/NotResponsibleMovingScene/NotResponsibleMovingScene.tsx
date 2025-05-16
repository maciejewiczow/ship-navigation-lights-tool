import React from 'react';
import cargoShip from '~/assets/models/cargo-ship/carg_ship_not_responsible_moving.glb';
import { GeneralScene } from '~/scenes/GeneralScene';

export const NotResponsibleMovingScene: React.FC = () => (
    <GeneralScene sceneFilePath={cargoShip} />
);
