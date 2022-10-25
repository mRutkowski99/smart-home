import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneCardComponent } from './scene-card.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FaIconModule } from '@smart-home/shared/utils/fa-icon';
import { FavouriteIconModule } from '@smart-home/shared/ui/favourite-icon';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FaIconModule,
    FavouriteIconModule,
  ],
  declarations: [SceneCardComponent],
  exports: [SceneCardComponent],
})
export class SceneCardModule {}
