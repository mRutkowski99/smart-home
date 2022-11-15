import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsListPageComponent } from './rooms-list-page.component';

describe('RoomsListPageComponent', () => {
  let component: RoomsListPageComponent;
  let fixture: ComponentFixture<RoomsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomsListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
