import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAlarmUiAlarmCardComponent } from './mobile-alarm-ui-alarm-card.component';

describe('MobileAlarmUiAlarmCardComponent', () => {
  let component: MobileAlarmUiAlarmCardComponent;
  let fixture: ComponentFixture<MobileAlarmUiAlarmCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileAlarmUiAlarmCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileAlarmUiAlarmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
