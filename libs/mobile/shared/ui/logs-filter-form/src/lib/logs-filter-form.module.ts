import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsFilterFormComponent } from './logs-filter-form.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [LogsFilterFormComponent],
  exports: [LogsFilterFormComponent],
})
export class LogsFilterFormModule {}
