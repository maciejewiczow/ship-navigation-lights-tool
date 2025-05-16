import { AppState } from '~/store';

export const currentSceneParams = (state: AppState) =>
    state.currentScene.params;

export const currentSceneDesc = (state: AppState) =>
    state.currentScene.sceneDesc;
