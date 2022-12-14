import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  RouterModule,
  Routes,
} from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { RouteUtil } from '@smart-home/mobile/shared/utils';

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
  {
    path: 'safety',
    loadChildren: async () =>
      (await import('@smart-home/mobile/safety/features/safety-page'))
        .SafetyPageModule,
  },
  {
    path: 'rooms',
    loadChildren: async () =>
      (await import('@smart-home/mobile/room/features/rooms-list-page'))
        .RoomsListPageModule,
  },
  {
    path: 'rooms/:alarmId',
    loadChildren: async () =>
      (await import('@smart-home/mobile/room/features/room-details-page'))
        .RoomDetailsPageModule,
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
