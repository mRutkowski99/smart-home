import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileShellRoutingModule } from './mobile-shell-routing.module';

@NgModule({
  imports: [CommonModule, MobileShellRoutingModule],
  exports: [MobileShellRoutingModule],
})
export class MobileShellModule {}
