import {
  ChangeDetectionStrategy,
  Component, EventEmitter, Input, Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {DeviceValueType} from "@smart-home/shared/util";
import {AddressType, ControlledValue} from "@prisma/client";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {SharedUiFaIconComponent} from "@smart-home/shared/ui-fa-icon";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {ButtonModule} from "primeng/button";
import {map} from "rxjs";
import {FilterControlledValuePipe} from "../../../util/src/lib/pipes/filter-controlled-value.pipe";
import {FilterAddressTypesPipe} from "../../../util/src/lib/pipes/filter-address-types.pipe";
import {DeviceBasePayload} from "@smart-home/shared/device/util-device-payload";
import {DeviceDetailsVm} from "@smart-home/shared/device/util-device-vm";
import {ControlledValuePipe} from "../../../util/src/lib/pipes/controlled-value.pipe";

interface AddressFromGroup {
  address: FormControl<string>
  addressType: FormControl<AddressType | null>
  controlledValue: FormControl<ControlledValue | null>
}

@Component({
  selector: 'smart-home-web-ui-device-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, DropdownModule, SharedUiFaIconComponent, ButtonModule, FilterControlledValuePipe, FilterAddressTypesPipe, ControlledValuePipe],
  templateUrl: './web-ui-device-form.component.html',
  styleUrls: ['./web-ui-device-form.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebUiDeviceFormComponent {
  readonly DELETE_ICON = faTrash;
  readonly valueTypes: DeviceValueType[] = ['DIGITAL', 'PERCENT', 'TEMPERATURE']
  readonly addressTypes: AddressType[] = ['DI', 'DO', 'AI', 'AO']
  readonly controlledValues: ControlledValue[] = ['READ_VALUE', 'WRITE_STATE', 'WRITE_SETPOINT']

  @Input() withDeleteOption = false
  @Input() set device(device: DeviceDetailsVm) {
    this.deviceForm.patchValue(device)
  }

  deviceForm = new FormGroup({
    name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    valueType: new FormControl<DeviceValueType | null>(null, { validators: [Validators.required]}),
    addresses: new FormArray<FormGroup<AddressFromGroup>>([])
  })

  get addresses(): FormArray<FormGroup<AddressFromGroup>> {
    return this.deviceForm.controls.addresses
  }

  assignedControlledValues$ = this.deviceForm.controls.addresses.valueChanges.pipe(
      map(addressGroups => addressGroups.map(address => address.controlledValue))
  )

  @Output() save = new EventEmitter<DeviceBasePayload>()
  @Output() delete = new EventEmitter<void>()

  onDeleteAddress(index: number) {
    this.deviceForm.controls.addresses.removeAt(index)
  }

  onAddAddress() {
    if (this.addresses.controls.length >= this.controlledValues.length) return
    this.deviceForm.controls.addresses.push(this.addressFormGroup)
  }

  onSubmit() {
    this.save.emit(this.deviceForm.getRawValue() as DeviceBasePayload)
  }

  private get addressFormGroup(): FormGroup<AddressFromGroup> {
    return new FormGroup<AddressFromGroup>({
      address: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      addressType: new FormControl<AddressType | null>(null, { validators: [Validators.required]}),
      controlledValue: new FormControl<ControlledValue | null>(null, { validators: [Validators.required]}),
    })
  }
}
