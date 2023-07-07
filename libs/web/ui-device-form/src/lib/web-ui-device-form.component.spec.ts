import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebUiDeviceFormComponent } from './web-ui-device-form.component';

describe('WebUiDeviceFormComponent', () => {
  let component: WebUiDeviceFormComponent;
  let fixture: ComponentFixture<WebUiDeviceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebUiDeviceFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebUiDeviceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
