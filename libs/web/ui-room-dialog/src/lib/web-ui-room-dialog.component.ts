import {
  ChangeDetectionStrategy,
  Component, OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'smart-home-web-ui-room-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './web-ui-room-dialog.component.html',
  styleUrls: ['./web-ui-room-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebUiRoomDialogComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', {nonNullable: true, validators: [Validators.required]})
  })

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
  }

  ngOnInit() {
    this.form.controls.name.setValue(this.config.data)
  }

  onSubmit() {
    this.ref.close(this.form.value.name)
  }
}
