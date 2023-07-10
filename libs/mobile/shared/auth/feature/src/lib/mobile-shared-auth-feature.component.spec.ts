import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSharedAuthFeatureComponent } from './mobile-shared-auth-feature.component';

describe('MobileSharedAuthFeatureComponent', () => {
  let component: MobileSharedAuthFeatureComponent;
  let fixture: ComponentFixture<MobileSharedAuthFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSharedAuthFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileSharedAuthFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
