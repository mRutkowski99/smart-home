import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyDeviceCardComponent } from './safety-device-card.component';

describe('SafetyDeviceCardComponent', () => {
  let component: SafetyDeviceCardComponent;
  let fixture: ComponentFixture<SafetyDeviceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SafetyDeviceCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SafetyDeviceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
