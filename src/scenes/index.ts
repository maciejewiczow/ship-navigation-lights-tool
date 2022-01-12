import { descriptor as CargoShipDescriptor } from './CargoShipInRouteScene';
import { descriptor as LimitedMovingDescriptor } from './LimitedManouverabilityMovingScene';
import { descriptor as LimitedStatDescriptor } from './LimitedManouverabilityStationaryScene';
import { descriptor as NotRespMovingDescriptor } from './NotResponsibleMovingScene';
import { descriptor as NotRespStatDescriptor } from './NotResponsibleStationaryScene';
import { descriptor as SailboatMotorDescriptor } from './SailboatMotorScene';
import { SceneDescriptor } from './sceneDescriptor';

const sceneMap = new Map<string, SceneDescriptor>([
    [CargoShipDescriptor.id, CargoShipDescriptor],
    [LimitedMovingDescriptor.id, LimitedMovingDescriptor],
    [LimitedStatDescriptor.id, LimitedStatDescriptor],
    [NotRespMovingDescriptor.id, NotRespMovingDescriptor],
    [NotRespStatDescriptor.id, NotRespStatDescriptor],
    [SailboatMotorDescriptor.id, SailboatMotorDescriptor],
]);

export default sceneMap;
