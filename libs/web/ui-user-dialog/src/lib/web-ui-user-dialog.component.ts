import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextModule} from "primeng/inputtext";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'smart-home-web-ui-user-dialog',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './web-ui-user-dialog.component.html',
  styleUrls: ['./web-ui-user-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebUiUserDialogComponent {
  constructor(private ref: DynamicDialogRef) {
  }

  userForm = new FormGroup({
    login: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
  })

  onSubmit() {
    this.ref.close(this.userForm.getRawValue())
  }
}
