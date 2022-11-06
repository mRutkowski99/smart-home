import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmCardComponent } from './alarm-card.component';
import { IonicModule } from '@ionic/angular';
import { FaIconModule } from '@smart-home/shared/ui/fa-icon';
import { StopPropagationDirectiveModule } from '@smart-home/mobile/shared/directives/stop-propagation';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FaIconModule,
    StopPropagationDirectiveModule,
  ],
  declarations: [AlarmCardComponent],
  exports: [AlarmCardComponent],
})
export class AlarmCardModule {}
