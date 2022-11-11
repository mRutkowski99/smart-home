import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from './section-header.component';
import { IonicModule } from '@ionic/angular';
import { FaIconModule } from '@smart-home/shared/ui/fa-icon';
import { FavouriteIconModule } from '@smart-home/shared/ui/favourite-icon';

@NgModule({
  imports: [CommonModule, IonicModule, FaIconModule, FavouriteIconModule],
  declarations: [SectionHeaderComponent],
  exports: [SectionHeaderComponent],
})
export class SectionHeaderModule {}
