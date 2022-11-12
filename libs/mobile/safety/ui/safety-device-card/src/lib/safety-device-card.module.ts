import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafetyDeviceCardComponent } from './safety-device-card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [SafetyDeviceCardComponent],
  exports: [SafetyDeviceCardComponent],
})
export class SafetyDeviceCardModule {}
