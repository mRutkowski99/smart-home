import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app/app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      {
        path: '',
        loadChildren: () =>
          import('@smart-home/mobile/shell/feature').then(
            (m) => m.MobileShellModule
          ),
      },
    ]),
    importProvidersFrom(
      IonicModule.forRoot(),
      StoreModule.forRoot({}),
      EffectsModule.forRoot([])
    ),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
}).catch((err) => console.error(err));
