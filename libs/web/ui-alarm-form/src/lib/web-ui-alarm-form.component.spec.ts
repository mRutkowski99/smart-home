import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebUiAlarmFormComponent } from './web-ui-alarm-form.component';

describe('WebUiAlarmFormComponent', () => {
  let component: WebUiAlarmFormComponent;
  let fixture: ComponentFixture<WebUiAlarmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebUiAlarmFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebUiAlarmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
