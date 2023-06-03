import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MobileShellFeatureComponent } from './mobile-shell-feature.component';
import { MobileSharedAuthDataAccessModule } from '@smart-home/mobile/shared/auth/data-access';
import { MainRoutes } from '@smart-home/mobile/shared/util';

const routes: Routes = [
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
        path: '',
        pathMatch: 'full',
        redirectTo: MainRoutes.Home,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
    MobileSharedAuthDataAccessModule,
  ],
  exports: [RouterModule],
})
export class MobileShellModule {}
