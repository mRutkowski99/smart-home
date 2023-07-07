import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebUiDeviceDialogComponent } from './web-ui-device-dialog.component';

describe('WebUiDeviceDialogComponent', () => {
  let component: WebUiDeviceDialogComponent;
  let fixture: ComponentFixture<WebUiDeviceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebUiDeviceDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebUiDeviceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
