import { Test } from '@nestjs/testing';
import { SmartHubAlarmController } from './smart-hub-alarm.controller';
import { SmartHubAlarmService } from './smart-hub-alarm.service';

describe('SmartHubAlarmController', () => {
  let controller: SmartHubAlarmController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SmartHubAlarmService],
      controllers: [SmartHubAlarmController],
    }).compile();

    controller = module.get(SmartHubAlarmController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
