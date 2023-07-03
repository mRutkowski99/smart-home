import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, RouterOutlet, RouterModule.forRoot([
    {
      path: '',
      loadChildren: () => import('@smart-home/web/shell').then(m => m.ShellModule)
    }
  ]), StoreModule.forRoot({}), EffectsModule.forRoot([])],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
