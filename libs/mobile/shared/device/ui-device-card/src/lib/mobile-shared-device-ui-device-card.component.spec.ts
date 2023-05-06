import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSharedDeviceUiDeviceCardComponent } from './mobile-shared-device-ui-device-card.component';

describe('MobileSharedDeviceUiDeviceCardComponent', () => {
  let component: MobileSharedDeviceUiDeviceCardComponent;
  let fixture: ComponentFixture<MobileSharedDeviceUiDeviceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSharedDeviceUiDeviceCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileSharedDeviceUiDeviceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
