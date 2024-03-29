import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    loadComponent: async () =>
      (await import('@smart-home/mobile/room/feature-rooms-list'))
        .MobileRoomRoomsListComponent,
  },
  {
    path: ':id',
    loadComponent: async () =>
      (await import('@smart-home/mobile/room/feature-room-details'))
        .MobileRoomFeatureRoomDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileRoomFeatureShellRoutingModule {}
