import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmDetailsComponent } from './alarm-details.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AlarmDetailsComponent],
  exports: [AlarmDetailsComponent],
})
export class AlarmDetailsModule {}
