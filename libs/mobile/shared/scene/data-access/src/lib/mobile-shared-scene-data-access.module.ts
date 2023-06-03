import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { sceneReducer, SHARED_SCENE_FEATURE_KEY } from './state/scene.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SceneEffects } from './state/scene.effects';
import { SceneApiService } from './api/scene-api.service';
import { SharedSceneFacade } from './shared-scene.facade';

@NgModule({
  imports: [
    StoreModule.forFeature(SHARED_SCENE_FEATURE_KEY, sceneReducer),
    EffectsModule.forFeature([SceneEffects]),
  ],
  providers: [SceneApiService, SharedSceneFacade],
})
export class MobileSharedSceneDataAccessModule {}
