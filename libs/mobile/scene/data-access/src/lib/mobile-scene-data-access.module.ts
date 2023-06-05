import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { SCENE_FEATURE_KEY, sceneReducer } from './state/scene.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SceneEffects } from './state/scene.effects';
import { SceneApiService } from './api/scene-api.service';
import { SceneFacade } from './scene.facade';

@NgModule({
  imports: [
    StoreModule.forFeature(SCENE_FEATURE_KEY, sceneReducer),
    EffectsModule.forFeature([SceneEffects]),
  ],
  providers: [SceneApiService, SceneFacade],
})
export class MobileSceneDataAccessModule {}
