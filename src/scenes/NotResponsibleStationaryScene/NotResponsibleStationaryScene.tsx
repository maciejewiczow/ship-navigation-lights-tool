import React from 'react';
import cargoShip from '~/assets/models/cargo-ship/carg_ship_not_responsible_stationary.glb';
import { GeneralScene } from '~/scenes/GeneralScene';

export const NotResponsibleStationaryScene: React.FC = () => (
    <GeneralScene sceneFilePath={cargoShip} />
);
