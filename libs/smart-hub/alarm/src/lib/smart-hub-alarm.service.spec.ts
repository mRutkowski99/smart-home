import { Test } from '@nestjs/testing';
import { SmartHubAlarmService } from './smart-hub-alarm.service';

describe('SmartHubAlarmService', () => {
  let service: SmartHubAlarmService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SmartHubAlarmService],
    }).compile();

    service = module.get(SmartHubAlarmService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
