import {
  ChangeDetectionStrategy,
  Component, EventEmitter, Input, Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AddressType} from "@prisma/client";
import {AlarmDetailsVm} from "@smart-home/shared/alarm/util-alarm-vm";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {SharedUiFaIconComponent} from "@smart-home/shared/ui-fa-icon";
import {ButtonModule} from "primeng/button";
import {CreateAlarmPayload} from "@smart-home/shared/alarm/util-alarm-payload";

type FormPayload = Omit<CreateAlarmPayload, 'homeId'>

@Component({
  selector: 'smart-home-web-ui-alarm-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, DropdownModule, SharedUiFaIconComponent, ButtonModule],
  templateUrl: './web-ui-alarm-form.component.html',
  styleUrls: ['./web-ui-alarm-form.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebUiAlarmFormComponent {
  readonly alarmForm = new FormGroup({
    stateAddress: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    stateAddressType: new FormControl<AddressType | null>(null, {validators: [Validators.required]}),
    statusAddress: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    statusAddressType: new FormControl<AddressType | null>(null, {validators: [Validators.required]})
  })
  readonly addressTypes: AddressType[] = ['DI', "DO", 'AI', 'AO']
  readonly DELETE_ICON = faTrash;

  @Input() set alarm(alarm: AlarmDetailsVm | null) {
    console.log(alarm)
    if (!alarm) return
    this.alarmForm.patchValue(alarm)
  }

  @Output() save = new EventEmitter<FormPayload>()
  @Output() delete = new EventEmitter<void>()

  onSubmit() {
    console.log('submit')
    this.save.emit(this.alarmForm.getRawValue() as FormPayload)
  }
}
