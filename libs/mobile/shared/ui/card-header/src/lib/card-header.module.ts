import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHeaderComponent } from './card-header.component';
import { IonicModule } from '@ionic/angular';
import { FaIconModule } from '@smart-home/shared/ui/fa-icon';

@NgModule({
  imports: [CommonModule, IonicModule, FaIconModule],
  declarations: [CardHeaderComponent],
  exports: [CardHeaderComponent],
})
export class CardHeaderModule {}
