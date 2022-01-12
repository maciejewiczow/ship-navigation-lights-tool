import { descriptor as CargoShipDescriptor } from './CargoShipScene';
import { descriptor as SailboatMotorDescriptor } from './SailboatMotorScene';
import { SceneDescriptor } from './sceneDescriptor';

const sceneMap = new Map<string, SceneDescriptor>([
    [CargoShipDescriptor.id, CargoShipDescriptor],
    [SailboatMotorDescriptor.id, SailboatMotorDescriptor],
]);

export default sceneMap;
