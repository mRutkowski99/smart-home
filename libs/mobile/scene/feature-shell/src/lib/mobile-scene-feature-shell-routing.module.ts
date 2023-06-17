import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'add',
    loadComponent: async () =>
      (await import('@smart-home/mobile/scene/feature-add-scene'))
        .MobileSceneFeatureAddSceneComponent,
  },
  {
    path: ':id',
    loadComponent: async () =>
      (await import('@smart-home/mobile/scene/feature-scene-details'))
        .MobileSceneFeatureSceneDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileSceneFeatureShellRoutingModule {}
