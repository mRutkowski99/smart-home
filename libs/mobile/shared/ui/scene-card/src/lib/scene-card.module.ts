import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneCardComponent } from './scene-card.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [SceneCardComponent],
  exports: [SceneCardComponent],
})
export class SceneCardModule {}
