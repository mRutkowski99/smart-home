import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { AppComponent } from './app.component';
import { MobileShellModule } from '@smart-home/mobile/shell/feature';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), MobileShellModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
