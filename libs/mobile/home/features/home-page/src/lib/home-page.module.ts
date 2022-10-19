import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NotificationIconModule } from '@smart-home/mobile/home/ui/notification';
import { SummarySilderModule } from '@smart-home/mobile/home/ui/summary-silder';
import { WelcomeModule } from '@smart-home/mobile/home/ui/welcome';
import { NavModule } from '@smart-home/mobile/shared/ui/nav';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePageComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: async () =>
              (await import('@smart-home/mobile/home/features/home-controls'))
                .HomeControlsModule,
          },
        ],
      },
    ]),
    WelcomeModule,
    NotificationIconModule,
    SummarySilderModule,
    NavModule,
  ],
  declarations: [HomePageComponent],
  exports: [HomePageComponent],
})
export class HomePageModule {}
