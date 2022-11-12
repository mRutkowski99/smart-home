import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SafetyPageStore } from '@smart-home/mobile/safety/data-access/safety-page-data';

@Component({
  selector: 'smart-home-safety-page',
  templateUrl: './safety-page.component.html',
  styleUrls: ['./safety-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafetyPageComponent implements OnInit {
  constructor(private readonly store: SafetyPageStore) {}

  readonly vm$ = this.store.vm$;

  ngOnInit(): void {
    this.store.getSafetyDevices();
  }
}
