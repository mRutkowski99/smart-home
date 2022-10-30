import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenesListComponent } from './scenes-list.component';
import { IonicModule } from '@ionic/angular';
import { SliderModule } from '@smart-home/mobile/shared/ui/slider';
import { SceneCardModule } from '@smart-home/mobile/scene/ui/scene-card';

@NgModule({
  imports: [CommonModule, IonicModule, SliderModule, SceneCardModule],
  declarations: [ScenesListComponent],
  exports: [ScenesListComponent],
})
export class ScenesListModule {}
