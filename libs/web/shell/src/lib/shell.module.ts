import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { WebShellComponent } from '@smart-home/web/shell';
import { WebDataAccessModule } from '@smart-home/web/data-access';

const routes: Routes = [
  {
    path: '',
    component: WebShellComponent,
    children: [
      {
        path: 'homes',
        loadComponent: async () =>
          (await import('@smart-home/web/feature-homes-list'))
            .WebFeatureHomesListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), WebDataAccessModule],
  declarations: [WebShellComponent],
  exports: [RouterModule],
})
export class ShellModule {}
