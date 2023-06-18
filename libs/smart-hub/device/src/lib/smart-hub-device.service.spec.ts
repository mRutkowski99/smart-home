import { Test } from '@nestjs/testing';
import { SmartHubDeviceService } from './smart-hub-device.service';

describe('SmartHubDeviceService', () => {
  let service: SmartHubDeviceService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SmartHubDeviceService],
    }).compile();

    service = module.get(SmartHubDeviceService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
