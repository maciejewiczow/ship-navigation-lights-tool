import React from 'react';
import { GeneralScene } from 'scenes/GeneralScene';
import cargoShip from 'assets/models/cargo-ship/carg_ship_limited_manouverability_stationary.glb';

export const LimitedManouverabilityStationaryScene: React.FC = () => <GeneralScene sceneFilePath={cargoShip} />;
