import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RoomsListComponent } from './rooms-list.component';
import { SliderModule } from '@smart-home/mobile/shared/ui/slider';
import { RoomCardModule } from '@smart-home/mobile/room/ui/room-card';
import { SkeletonModule } from '@smart-home/mobile/shared/ui/skeleton';
import { RoomsListDataModule } from '@smart-home/mobile/room/data-access/rooms-list-data';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    SliderModule,
    RoomCardModule,
    SkeletonModule,
    RoomsListDataModule,
  ],
  declarations: [RoomsListComponent],
  exports: [RoomsListComponent],
})
export class RoomsListModule {}
