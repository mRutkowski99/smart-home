import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsFilterFormComponent } from './logs-filter-form.component';

describe('LogsFilterFormComponent', () => {
  let component: LogsFilterFormComponent;
  let fixture: ComponentFixture<LogsFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogsFilterFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogsFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
