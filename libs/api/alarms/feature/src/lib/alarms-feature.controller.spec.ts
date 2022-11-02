import { Test } from '@nestjs/testing';
import { AlarmsFeatureController } from './alarms-feature.controller';

describe('AlarmsFeatureController', () => {
  let controller: AlarmsFeatureController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [AlarmsFeatureController],
    }).compile();

    controller = module.get(AlarmsFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
