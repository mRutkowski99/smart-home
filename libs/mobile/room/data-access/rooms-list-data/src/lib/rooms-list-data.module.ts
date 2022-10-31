import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RoomsListApiService } from './rooms-list-api.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [RoomsListApiService],
})
export class RoomsListDataModule {}
