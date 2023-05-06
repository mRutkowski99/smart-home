import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, map } from 'rxjs';
import { CircleSliderDirective } from './directives/circle-slider.directive';
import { UpdateCircleSliderPayload } from './utils/update-circle-slider.payload';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'smart-home-ui-circle-slider',
  standalone: true,
  imports: [CommonModule, CircleSliderDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MobileSharedUiCircleSliderComponent),
    },
  ],
  templateUrl: './mobile-shared-ui-circle-slider.component.html',
  styleUrls: ['./mobile-shared-ui-circle-slider.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSharedUiCircleSliderComponent
  implements ControlValueAccessor
{
  @Input() min = 12;
  @Input() max = 35;
  @Input() step = 0.5;
  @Input() valueLabel: string | undefined;
  touched = false;
  disabled = false;
  private valueSubject = new BehaviorSubject(0);
  value$ = this.valueSubject.asObservable();
  private handleRotationSubject = new BehaviorSubject(0);
  handleRotation$ = this.handleRotationSubject
    .asObservable()
    .pipe(map((val) => val + 'deg'));

  onChange = (value: number) => {};

  onTouched = () => {};

  writeValue(value: number): void {
    this.valueSubject.next(value);
    this.handleRotationSubject.next(this.valueToHandleRotation(value));
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onUpdate(payload: UpdateCircleSliderPayload) {
    console.log(payload);
    if (this.disabled) return;

    const { value, handleRotation } = payload;
    this.handleRotationSubject.next(handleRotation);
    this.valueSubject.next(value);
    this.onChange(value);
    this.markAsTouched();
  }

  private valueToHandleRotation(value: number): number {
    return ((value - this.min) / (this.max - this.min)) * 360;
  }
}
