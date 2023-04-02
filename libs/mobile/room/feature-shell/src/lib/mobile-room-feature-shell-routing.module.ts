import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    loadComponent: async () =>
      (await import('@smart-home/mobile/room/feature-rooms-list'))
        .MobileRoomRoomsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileRoomFeatureShellRoutingModule {}
