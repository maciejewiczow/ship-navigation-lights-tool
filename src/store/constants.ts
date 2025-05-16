import { RouterState } from 'redux-first-history';
import { SceneState } from './Scenes/store';

export interface AppState {
    router: RouterState;
    currentScene: SceneState;
}
