import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSharedUiSliderComponent } from './mobile-shared-ui-slider.component';

describe('MobileSharedUiSliderComponent', () => {
  let component: MobileSharedUiSliderComponent;
  let fixture: ComponentFixture<MobileSharedUiSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSharedUiSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileSharedUiSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
