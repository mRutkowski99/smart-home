import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [NavComponent],
  exports: [NavComponent],
})
export class NavModule {}
