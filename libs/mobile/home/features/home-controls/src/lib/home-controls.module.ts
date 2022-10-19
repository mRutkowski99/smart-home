import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeControlsComponent } from './home-controls.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: HomeControlsComponent }]),
  ],
  declarations: [HomeControlsComponent],
  exports: [HomeControlsComponent],
})
export class HomeControlsModule {}
