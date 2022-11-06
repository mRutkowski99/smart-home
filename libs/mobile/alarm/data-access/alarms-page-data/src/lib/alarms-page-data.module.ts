import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AlarmsPageApiService } from './alarms-page-api.service';
import { AlarmsPageStore } from './alarms-page.store';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [AlarmsPageApiService, AlarmsPageStore],
})
export class AlarmsPageDataModule {}
