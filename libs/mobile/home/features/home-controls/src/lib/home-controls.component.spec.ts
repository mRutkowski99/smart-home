import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeControlsComponent } from './home-controls.component';

describe('HomeControlsComponent', () => {
  let component: HomeControlsComponent;
  let fixture: ComponentFixture<HomeControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
