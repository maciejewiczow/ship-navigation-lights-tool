import React from 'react';
import { GeneralScene } from 'scenes/GeneralScene';
import cargoShip from 'assets/models/cargo-ship/carg_ship.glb';

export const CargoShipScene: React.FC = () => <GeneralScene sceneFilePath={cargoShip} />;
