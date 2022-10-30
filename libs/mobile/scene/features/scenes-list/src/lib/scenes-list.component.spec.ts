import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenesListComponent } from './scenes-list.component';

describe('ScenesListComponent', () => {
  let component: ScenesListComponent;
  let fixture: ComponentFixture<ScenesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScenesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScenesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
