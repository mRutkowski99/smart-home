import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileShellFeatureComponent } from './mobile-shell-feature.component';

const routes: Routes = [{ path: '', component: MobileShellFeatureComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileShellModule {}
