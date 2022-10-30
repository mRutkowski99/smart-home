import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteIconComponent } from './favourite-icon.component';
import { FaIconModule } from '@smart-home/shared/ui/fa-icon';

@NgModule({
  imports: [CommonModule, FaIconModule],
  declarations: [FavouriteIconComponent],
  exports: [FavouriteIconComponent],
})
export class FavouriteIconModule {}
