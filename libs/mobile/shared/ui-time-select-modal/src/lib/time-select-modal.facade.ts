import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MobileSharedUiTimeSelectModalComponent } from './mobile-shared-ui-time-select-modal.component';
import { Time } from '@smart-home/shared/util';
import { defer, map, Observable } from 'rxjs';
import { ModalResponse } from '@smart-home/mobile/shared/util';

@Injectable()
export class TimeSelectModalFacade {
  constructor(private modalController: ModalController) {}

  openModal(payload: Time | null): Observable<Time | null> {
    return defer(async () => await this.handleModal(payload)).pipe(
      map((response) => {
        if (
          response.role === ModalResponse.Cancel ||
          response.data === undefined
        )
          return null;

        return response.data;
      })
    );
  }

  private async handleModal(payload: Time | null) {
    const modal = await this.modalController.create({
      component: MobileSharedUiTimeSelectModalComponent,
      componentProps: { payload },
      initialBreakpoint: 0.35,
      breakpoints: [0.35],
    });
    await modal.present();
    return await modal.onWillDismiss<Time>();
  }
}
