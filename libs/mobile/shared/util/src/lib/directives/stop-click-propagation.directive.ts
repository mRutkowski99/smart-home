import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[stopClickPropagation]',
  standalone: true,
})
export class StopClickPropagationDirective {
  @HostListener('click', ['$event'])
  stopClickPropagation(event: MouseEvent) {
    event.stopPropagation();
  }
}
