import { AppState } from '~/store';

export const currentSceneParams = (state: AppState) =>
    state.currentScene.params;

export const currentSceneDescriptor = (state: AppState) =>
    state.currentScene.sceneDescriptor;
