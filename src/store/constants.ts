import { RouterState } from 'connected-react-router';
import { ScenesState } from './Scenes/store';

export interface AppState {
    router: RouterState;
    scenes: ScenesState;
}
