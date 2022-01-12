import React from 'react';
import { GeneralScene } from 'scenes/GeneralScene';
import cargoShip from 'assets/models/cargo-ship/carg_ship_in_route.glb';

export const CargoShipInRouteScene: React.FC = () => <GeneralScene sceneFilePath={cargoShip} />;
