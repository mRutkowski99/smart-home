import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { distinctUntilChanged, map, Observable, pairwise, Subject } from 'rxjs';
import { UpdateCircleSliderPayload } from '../utils/update-circle-slider.payload';
import { onlyFollowingValues } from '../utils/onlyFollowingValues';

interface Point {
  x: number;
  y: number;
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[circleSlider]',
  standalone: true,
})
export class CircleSliderDirective implements OnChanges {
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 5;
  private touchPointSubject = new Subject<Point>();
  private handleGrabbed = false;
  private bgCenter: Point | undefined;
  private totalSteps = 20;

  @Output() update: Observable<UpdateCircleSliderPayload> =
    this.touchPointSubject.asObservable().pipe(
      map(this.calcAngle.bind(this)),
      map(this.radianToDegree),
      map(this.normalize),
      map((angle) => Math.floor(this.angleToValue(angle) / this.step)),
      distinctUntilChanged(),
      pairwise(),
      map(([prev, curr]) => (curr === 0 && prev > 1 ? prev + 1 : curr)),
      onlyFollowingValues(),
      map((steps: number) => ({
        value: this.min + steps * ((this.max - this.min) / this.totalSteps),
        handleRotation: steps * (360 / this.totalSteps),
      }))
    );

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  private get ionContentTopOffset(): number {
    return (
      this.elementRef.nativeElement
        .closest('ion-content')
        ?.getBoundingClientRect().top ?? 0
    );
  }

  ngOnChanges() {
    this.totalSteps = (this.max - this.min) / this.step;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    event.stopPropagation();
    this.handleGrabbed = (<HTMLElement>event.target).classList.contains(
      'handle'
    );

    if (!this.handleGrabbed) return;

    if (!this.bgCenter) {
      const rect = this.elementRef.nativeElement.getBoundingClientRect();
      this.bgCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2 - this.ionContentTopOffset,
      };
      return;
    }

    this.touchPointSubject.next({
      x: this.getTouchX(event),
      y: this.getTouchY(event),
    });
  }

  private getTouchX(event: TouchEvent): number {
    return event.touches[0].clientX;
  }

  private getTouchY(event: TouchEvent): number {
    return event.touches[0].clientY - this.ionContentTopOffset;
  }

  private calcAngle(handlePosition: Point): number {
    if (this.bgCenter === undefined) return 0;
    const dx = handlePosition.x - this.bgCenter.x;
    const dy = handlePosition.y - this.bgCenter.y;
    return Math.atan2(dy, dx);
  }

  private radianToDegree(angle: number): number {
    return angle * (180 / Math.PI);
  }

  private normalize(angle: number): number {
    const normalizedAngle = angle + 90;
    return normalizedAngle >= 0 ? normalizedAngle : normalizedAngle + 360;
  }

  private angleToValue(angle: number): number {
    return (angle / 360) * (this.max - this.min);
  }
}
