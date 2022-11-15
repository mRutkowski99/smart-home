import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsCardComponent } from './conditions-card.component';

describe('ConditionsCardComponent', () => {
  let component: ConditionsCardComponent;
  let fixture: ComponentFixture<ConditionsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConditionsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConditionsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
