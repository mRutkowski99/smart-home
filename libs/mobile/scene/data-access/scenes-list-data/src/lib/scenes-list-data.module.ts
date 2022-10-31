import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ScenesListApiService } from './scenes-list-api.service';
import { ScenesListComponentStore } from './scenes-list.store';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [ScenesListApiService, ScenesListComponentStore],
})
export class ScenesListDataModule {}
