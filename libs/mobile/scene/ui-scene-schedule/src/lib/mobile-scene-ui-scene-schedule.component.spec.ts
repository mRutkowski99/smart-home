import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSceneUiSceneScheduleComponent } from './mobile-scene-ui-scene-schedule.component';

describe('MobileSceneUiSceneScheduleComponent', () => {
  let component: MobileSceneUiSceneScheduleComponent;
  let fixture: ComponentFixture<MobileSceneUiSceneScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSceneUiSceneScheduleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileSceneUiSceneScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
