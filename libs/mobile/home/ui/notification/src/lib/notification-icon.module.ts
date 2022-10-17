import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationIconComponent } from './notification-icon.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [NotificationIconComponent],
  exports: [NotificationIconComponent],
})
export class NotificationIconModule {}
