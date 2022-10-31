import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomCardComponent } from './room-card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [RoomCardComponent],
  exports: [RoomCardComponent],
})
export class RoomCardModule {}
