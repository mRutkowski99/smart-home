import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSharedUiCircleSliderComponent } from './mobile-shared-ui-circle-slider.component';

describe('MobileSharedUiCircleSliderComponent', () => {
  let component: MobileSharedUiCircleSliderComponent;
  let fixture: ComponentFixture<MobileSharedUiCircleSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSharedUiCircleSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileSharedUiCircleSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
