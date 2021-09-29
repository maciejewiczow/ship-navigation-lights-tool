import { AppState } from 'store';

export const sceneParams = (id: string) => (state: AppState) => state.scenes[id];

export const scenesSelector = (state: AppState) => state.scenes;
