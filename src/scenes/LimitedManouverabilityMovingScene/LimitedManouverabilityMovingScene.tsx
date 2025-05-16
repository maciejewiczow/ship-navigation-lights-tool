import React from 'react';
import cargoShip from '~/assets/models/cargo-ship/carg_ship_limited_manouverability_moving.glb';
import { GeneralScene } from '~/scenes/GeneralScene';

export const LimitedManouverabilityMovingScene: React.FC = () => (
    <GeneralScene sceneFilePath={cargoShip} />
);
