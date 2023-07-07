import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {WebUiDeviceFormComponent} from "@smart-home/web/ui-device-form";
import {DeviceBasePayload} from "@smart-home/shared/device/util-device-payload";

@Component({
  selector: 'smart-home-web-ui-device-dialog',
  standalone: true,
  imports: [CommonModule, WebUiDeviceFormComponent],
  templateUrl: './web-ui-device-dialog.component.html',
  styleUrls: ['./web-ui-device-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebUiDeviceDialogComponent {
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
  }

  onSave(payload: DeviceBasePayload) {
    this.ref.close(payload)
  }
}
