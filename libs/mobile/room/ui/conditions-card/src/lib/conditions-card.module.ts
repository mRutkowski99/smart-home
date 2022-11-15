import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConditionsCardComponent } from './conditions-card.component';
import { IonicModule } from '@ionic/angular';
import { FaIconModule } from '@smart-home/shared/ui/fa-icon';

@NgModule({
  imports: [CommonModule, IonicModule, FaIconModule],
  declarations: [ConditionsCardComponent],
  exports: [ConditionsCardComponent],
})
export class ConditionsCardModule {}
