import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ModalComponent } from '@smart-home/mobile/shared/util';
import { OpenDeviceControlModalPayload } from './payloads/open-device-control-modal.payload';
import { NgIf } from '@angular/common';
import { MobileSharedUiCircleSliderComponent } from '@smart-home/mobile/shared/ui-circle-slider';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'smart-home-mobile-shared-device-ui-device-control-modal',
  standalone: true,
  imports: [
    IonicModule,
    NgIf,
    MobileSharedUiCircleSliderComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './mobile-shared-device-ui-device-control-modal.component.html',
  styleUrls: ['./mobile-shared-device-ui-device-control-modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSharedDeviceUiDeviceControlModalComponent
  extends ModalComponent<number>
  implements OnInit
{
  readonly payload: OpenDeviceControlModalPayload | undefined;
  form = new FormGroup({
    value: new FormControl(0, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(modalController: ModalController) {
    super(modalController);
  }

  get valueFormControl(): FormControl<number> {
    return this.form.controls.value;
  }

  ngOnInit() {
    if (!this.payload) throw new Error();

    if (this.payload?.state === false) this.valueFormControl.disable();
    this.valueFormControl.setValue(this.payload?.setpoint);
  }

  onSubmit() {
    this.confirm(this.valueFormControl.value);
  }
}
