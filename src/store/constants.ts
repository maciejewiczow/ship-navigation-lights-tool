import { RouterState } from 'connected-react-router';
import { SceneState } from './Scenes/store';

export interface AppState {
    router: RouterState;
    currentScene: SceneState;
}
