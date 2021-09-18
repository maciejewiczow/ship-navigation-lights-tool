import { AppState } from 'store';
import { SceneParams } from './store';

export const sceneParams = (id: string) => (state: AppState) => state.scenes[id];
