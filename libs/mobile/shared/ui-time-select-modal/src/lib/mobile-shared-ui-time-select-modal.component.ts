import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ModalComponent } from '@smart-home/mobile/shared/util';
import { Time } from '@smart-home/shared/util';
import { IonicModule, ModalController } from '@ionic/angular';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as dayjs from 'dayjs';

@Component({
  selector: 'smart-home-mobile-shared-ui-time-select-modal',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
  templateUrl: './mobile-shared-ui-time-select-modal.component.html',
  styleUrls: ['./mobile-shared-ui-time-select-modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSharedUiTimeSelectModalComponent
  extends ModalComponent<Time>
  implements OnInit
{
  readonly form = new FormGroup({
    time: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
  });
  readonly payload?: Time | null;

  constructor(modalController: ModalController) {
    super(modalController);
  }

  get timeControl(): FormControl {
    return this.form.controls.time;
  }

  ngOnInit() {
    if (!this.payload) return;
    this.timeControl.setValue(
      dayjs()
        .hour(this.payload.hours)
        .minute(this.payload.minutes)
        .format('YYYY-MM-DD[T]HH:mm:ss')
    );
  }

  onSubmit() {
    const time = dayjs(this.timeControl.value);
    this.confirm({ hours: time.hour(), minutes: time.minute() });
  }
}
