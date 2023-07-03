import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'smart-home-web-shell',
  templateUrl: './web-shell.component.html',
  styleUrls: ['./web-shell.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebShellComponent {
}
