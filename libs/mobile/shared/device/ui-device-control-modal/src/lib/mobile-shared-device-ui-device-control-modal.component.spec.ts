import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSharedDeviceUiDeviceControlModalComponent } from './mobile-shared-device-ui-device-control-modal.component';

describe('MobileSharedDeviceUiDeviceControlModalComponent', () => {
  let component: MobileSharedDeviceUiDeviceControlModalComponent;
  let fixture: ComponentFixture<MobileSharedDeviceUiDeviceControlModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSharedDeviceUiDeviceControlModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      MobileSharedDeviceUiDeviceControlModalComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
