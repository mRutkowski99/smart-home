import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MainRoutes } from '@smart-home/mobile/shared/util-constants';
import { MobileShellFeatureComponent } from './mobile-shell-feature.component';
import { MobileSharedAuthDataAccessModule } from '@smart-home/mobile/shared/auth/data-access';

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
