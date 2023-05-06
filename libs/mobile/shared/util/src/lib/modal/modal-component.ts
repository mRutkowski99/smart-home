import { ModalController } from '@ionic/angular';
import { ModalResponse } from './modal-response.enum';

export abstract class ModalComponent<T> {
  protected constructor(private modalController: ModalController) {}

  protected confirm(payload: T) {
    return this.modalController.dismiss(payload, ModalResponse.Confirm);
  }

  protected cancel() {
    return this.modalController.dismiss(null, ModalResponse.Cancel);
  }
}
