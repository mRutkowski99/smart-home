import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from './fa-icon.component';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [FaIconComponent],
  exports: [FaIconComponent],
})
export class FaIconModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
