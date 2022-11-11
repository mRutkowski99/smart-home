import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  RouterModule,
  Routes,
} from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: async () =>
      (await import('@smart-home/mobile/home/features/home-page'))
        .HomePageModule,
  },
  {
    path: 'alarms',
    loadChildren: async () =>
      (await import('@smart-home/mobile/alarm/feature/alarms-page'))
        .AlarmsPageModule,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'top',
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  exports: [RouterModule],
})
export class MobileShellRoutingModule {}
