import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RoomDetailsApiService } from './room-details-api.service';
import { RoomDetailsStore } from './room-details.store';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [RoomDetailsApiService, RoomDetailsStore],
})
export class RoomDetailsDataModule {}
