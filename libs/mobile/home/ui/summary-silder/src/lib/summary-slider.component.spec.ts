import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarySliderComponent } from './summary-slider.component';

describe('SummarySliderComponent', () => {
  let component: SummarySliderComponent;
  let fixture: ComponentFixture<SummarySliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummarySliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SummarySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
