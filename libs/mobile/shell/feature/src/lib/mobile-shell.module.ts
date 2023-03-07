import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MobileShellFeatureComponent } from './mobile-shell-feature.component';
import { MobileSharedAuthDataAccessModule } from '@smart-home/mobile/shared/auth/data-access';
import { MainRoutes } from '@smart-home/mobile/shared/util-constants';

const routes: Routes = [
  {
    path: '',
    component: MobileShellFeatureComponent,
    children: [
      {
        path: MainRoutes.Home,
        loadChildren: import('@smart-home/mobile/home/feature').then(
          (m) => m.MobileHomeFeatureComponent
        ),
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
