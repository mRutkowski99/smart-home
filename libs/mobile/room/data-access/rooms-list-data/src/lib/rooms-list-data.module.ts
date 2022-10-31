import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RoomsListApiService } from './rooms-list-api.service';
import { RoomsListComponentStore } from './rooms-list.store';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [RoomsListApiService, RoomsListComponentStore],
})
export class RoomsListDataModule {}
