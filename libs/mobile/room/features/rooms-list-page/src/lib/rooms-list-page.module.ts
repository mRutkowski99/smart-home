import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsListPageComponent } from './rooms-list-page.component';
import { RouterModule } from '@angular/router';
import { SectionHeaderModule } from '@smart-home/mobile/shared/ui/section-header';
import { RoomsListModule } from '@smart-home/mobile/room/features/rooms-list';
import { NavModule } from '@smart-home/mobile/shared/ui/nav';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: RoomsListPageComponent }]),
    SectionHeaderModule,
    RoomsListModule,
    NavModule,
  ],
  declarations: [RoomsListPageComponent],
  exports: [RoomsListPageComponent],
})
export class RoomsListPageModule {}
