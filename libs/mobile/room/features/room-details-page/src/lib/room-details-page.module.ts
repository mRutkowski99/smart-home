import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomDetailsPageComponent } from './room-details-page.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RoomDetailsDataModule } from '@smart-home/mobile/room/data-access/room-details-data';
import { SectionHeaderModule } from '@smart-home/mobile/shared/ui/section-header';
import { ConditionsCardModule } from '@smart-home/mobile/room/ui/conditions-card';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: RoomDetailsPageComponent }]),
    RoomDetailsDataModule,
    SectionHeaderModule,
    ConditionsCardModule,
  ],
  declarations: [RoomDetailsPageComponent],
  exports: [RoomDetailsPageComponent],
})
export class RoomDetailsPageModule {}
