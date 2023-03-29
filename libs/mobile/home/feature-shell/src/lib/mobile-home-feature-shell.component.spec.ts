import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileHomeFeatureShellComponent } from './mobile-home-feature-shell.component';

describe('MobileHomeFeatureShellComponent', () => {
  let component: MobileHomeFeatureShellComponent;
  let fixture: ComponentFixture<MobileHomeFeatureShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileHomeFeatureShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileHomeFeatureShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
