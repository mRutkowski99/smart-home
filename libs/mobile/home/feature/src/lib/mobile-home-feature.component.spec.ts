import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileHomeFeatureComponent } from './mobile-home-feature.component';

describe('MobileHomeFeatureComponent', () => {
  let component: MobileHomeFeatureComponent;
  let fixture: ComponentFixture<MobileHomeFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileHomeFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileHomeFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
