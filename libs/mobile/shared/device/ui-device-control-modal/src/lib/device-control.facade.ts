import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OpenDeviceControlModalPayload } from './payloads/open-device-control-modal.payload';
import { defer, map, Observable } from 'rxjs';
import { ModalResponse } from '@smart-home/mobile/shared/util';
import { MobileSharedDeviceUiDeviceControlModalComponent } from './mobile-shared-device-ui-device-control-modal.component';

@Injectable()
export class DeviceControlFacade {
  constructor(private modalController: ModalController) {}

  openModal(payload: OpenDeviceControlModalPayload): Observable<number | null> {
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

  private async handleModal(payload: OpenDeviceControlModalPayload) {
    const modal = await this.modalController.create({
      component: MobileSharedDeviceUiDeviceControlModalComponent,
      componentProps: { payload },
      initialBreakpoint: 0.6,
      breakpoints: [0.6],
    });
    await modal.present();
    return await modal.onWillDismiss<number>();
  }
}
