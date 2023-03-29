import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSharedSkeletonUiSkeletonCardComponent } from './mobile-shared-skeleton-ui-skeleton-card.component';

describe('MobileSharedSkeletonUiSkeletonCardComponent', () => {
  let component: MobileSharedSkeletonUiSkeletonCardComponent;
  let fixture: ComponentFixture<MobileSharedSkeletonUiSkeletonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSharedSkeletonUiSkeletonCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      MobileSharedSkeletonUiSkeletonCardComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
