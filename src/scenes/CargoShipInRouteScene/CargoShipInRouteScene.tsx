import React from 'react';
import cargoShip from '~/assets/models/cargo-ship/carg_ship_in_route.glb';
import { GeneralScene } from '~/scenes/GeneralScene';

export const CargoShipInRouteScene: React.FC = () => (
    <GeneralScene sceneFilePath={cargoShip} />
);
