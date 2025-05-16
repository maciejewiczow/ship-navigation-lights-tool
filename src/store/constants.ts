import { SceneState } from './Scenes/store';
import { RouterState } from 'redux-first-history';

export interface AppState {
    router: RouterState;
    currentScene: SceneState;
}
