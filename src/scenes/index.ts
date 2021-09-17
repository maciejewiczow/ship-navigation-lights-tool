import { descriptor as CargoShipDescriptor } from './CargoShipScene';
import { SceneDescriptor } from './sceneDescriptor';

const sceneMap = new Map<string, SceneDescriptor>([[CargoShipDescriptor.endpoint, CargoShipDescriptor]]);

export default sceneMap;
