import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSharedSceneUiSceneCardComponent } from './mobile-shared-scene-ui-scene-card.component';

describe('MobileSharedSceneUiSceneCardComponent', () => {
  let component: MobileSharedSceneUiSceneCardComponent;
  let fixture: ComponentFixture<MobileSharedSceneUiSceneCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSharedSceneUiSceneCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileSharedSceneUiSceneCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
