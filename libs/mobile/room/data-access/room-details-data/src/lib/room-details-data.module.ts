import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RoomDetailsApiService } from './room-details-api.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [RoomDetailsApiService],
})
export class RoomDetailsDataModule {}
