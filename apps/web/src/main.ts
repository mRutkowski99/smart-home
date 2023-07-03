import { ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {provideRouter} from "@angular/router";

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
