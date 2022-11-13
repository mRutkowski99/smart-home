import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomDetailsPageComponent } from './room-details-page.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: RoomDetailsPageComponent }]),
  ],
  declarations: [RoomDetailsPageComponent],
  exports: [RoomDetailsPageComponent],
})
export class RoomDetailsPageModule {}
