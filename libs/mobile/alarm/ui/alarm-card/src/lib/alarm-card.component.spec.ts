import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmCardComponent } from './alarm-card.component';

describe('AlarmCardComponent', () => {
  let component: AlarmCardComponent;
  let fixture: ComponentFixture<AlarmCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlarmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
