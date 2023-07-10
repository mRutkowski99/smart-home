import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {AuthService} from "@smart-home/web/data-access";

@Component({
  selector: 'smart-home-web-feature-auth',
  standalone: true,
  imports: [CommonModule, CardModule, InputTextModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './web-feature-auth.component.html',
  styleUrls: ['./web-feature-auth.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebFeatureAuthComponent {
  loginForm = new FormGroup({
    login: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    password: new FormControl('', {nonNullable: true, validators: [Validators.required]
  })});

  constructor(private authService: AuthService) {
  }

  onSubmit() {
    const {login, password} = this.loginForm.getRawValue();
    this.authService.login(login, password)
  }
}
