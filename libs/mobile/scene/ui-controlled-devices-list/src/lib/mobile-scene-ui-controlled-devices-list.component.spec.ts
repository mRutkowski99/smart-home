import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSceneUiControlledDevicesListComponent } from './mobile-scene-ui-controlled-devices-list.component';

describe('MobileSceneUiControlledDevicesListComponent', () => {
  let component: MobileSceneUiControlledDevicesListComponent;
  let fixture: ComponentFixture<MobileSceneUiControlledDevicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSceneUiControlledDevicesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      MobileSceneUiControlledDevicesListComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
