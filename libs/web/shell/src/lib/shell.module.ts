import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { WebShellComponent } from '@smart-home/web/shell';
import {AdminGuard, WebDataAccessModule} from '@smart-home/web/data-access';
import {SharedUiFaIconComponent} from "@smart-home/shared/ui-fa-icon";

const routes: Routes = [
  {
    path: 'login',
    loadComponent: async () => (await import('@smart-home/web/feature-auth')).WebFeatureAuthComponent
  },
  {
    path: '',
    component: WebShellComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'homes',
        loadComponent: async () =>
          (await import('@smart-home/web/feature-homes-list'))
            .WebFeatureHomesListComponent,
      },
      {
        path: 'homes/:id',
        loadComponent: async () => (await import('@smart-home/web/feature-home-details')).WebFeatureHomeDetailsComponent,
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), WebDataAccessModule, SharedUiFaIconComponent],
  providers: [AdminGuard],
  declarations: [WebShellComponent], 
  exports: [RouterModule],
})
export class ShellModule {}
