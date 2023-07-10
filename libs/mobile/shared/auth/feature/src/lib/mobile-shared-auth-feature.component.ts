import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "@smart-home/mobile/shared/auth/data-access";

@Component({
  selector: 'smart-home-mobile-shared-auth-feature',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './mobile-shared-auth-feature.component.html',
  styleUrls: ['./mobile-shared-auth-feature.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSharedAuthFeatureComponent {
  constructor(private authService: AuthService) {
  }

  loginForm = new FormGroup({
    login: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    password: new FormControl('', {nonNullable: true, validators: [Validators.required]})
  })

  onSubmit() {
    const {login, password} = this.loginForm.getRawValue()
    this.authService.login(login, password)
  }
}
