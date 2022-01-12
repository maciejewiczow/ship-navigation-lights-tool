import React from 'react';
import { GeneralScene } from 'scenes/GeneralScene';
import cargoShip from 'assets/models/cargo-ship/carg_ship_not_responsible_stationary.glb';

export const NotResponsibleStationaryScene: React.FC = () => <GeneralScene sceneFilePath={cargoShip} />;
