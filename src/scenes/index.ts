import { descriptor as CargoShipDescriptor } from './CargoShipScene';
import { SceneDescriptor } from './sceneDescriptor';

const sceneMap = new Map<string, SceneDescriptor>([[CargoShipDescriptor.id, CargoShipDescriptor]]);

export default sceneMap;
