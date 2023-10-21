import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MobileShellFeatureComponent } from './mobile-shell-feature.component';
import { MobileSharedAuthDataAccessModule } from '@smart-home/mobile/shared/auth/data-access';
import { MainRoutes } from '@smart-home/mobile/shared/util';
import {MobileSharedAuthFeatureModule} from "@smart-home/mobile/shared/auth/feature";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: async () => (await import('@smart-home/mobile/shared/auth/feature')).MobileSharedAuthFeatureModule
  },
  {
    path: '',
    component: MobileShellFeatureComponent,
    children: [
      {
        path: MainRoutes.Home,
        loadComponent: async () =>
          (await import('@smart-home/mobile/home/feature-shell'))
            .MobileHomeFeatureShellComponent,
      },
      {
        path: MainRoutes.Rooms,
        loadChildren: async () =>
          (await import('@smart-home/mobile/room/feature-shell'))
            .MobileRoomFeatureShellModule,
      },
      {
        path: MainRoutes.Scenes,
        loadChildren: async () =>
          (await import('@smart-home/mobile/scene/feature-shell'))
            .MobileSceneFeatureShellModule,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: MainRoutes.Home,
      },
    ],
  },
];

@NgModule({
  imports: [
    HttpClientModule,
    MobileSharedAuthDataAccessModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class MobileShellModule {}
