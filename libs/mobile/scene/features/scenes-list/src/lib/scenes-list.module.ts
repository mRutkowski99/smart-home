import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenesListComponent } from './scenes-list.component';
import { IonicModule } from '@ionic/angular';
import { ScenesListDataModule } from '@smart-home/mobile/scene/data-access/scenes-list-data';
import { SliderModule } from '@smart-home/mobile/shared/ui/slider';
import { SkeletonModule } from '@smart-home/mobile/shared/ui/skeleton';
import { SceneCardModule } from '@smart-home/mobile/scene/ui/scene-card';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SliderModule,
    SceneCardModule,
    SkeletonModule,
    ScenesListDataModule,
  ],
  declarations: [ScenesListComponent],
  exports: [ScenesListComponent],
})
export class ScenesListModule {}
