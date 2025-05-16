import React from 'react';
import cargoShip from '~/assets/models/cargo-ship/carg_ship_limited_manouverability_stationary.glb';
import { GeneralScene } from '~/scenes/GeneralScene';

export const LimitedManouverabilityStationaryScene: React.FC = () => (
    <GeneralScene sceneFilePath={cargoShip} />
);
