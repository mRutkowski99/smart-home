import { Test } from '@nestjs/testing';
import { SmartHubDeviceController } from './smart-hub-device.controller';
import { SmartHubDeviceService } from './smart-hub-device.service';

describe('SmartHubDeviceController', () => {
  let controller: SmartHubDeviceController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SmartHubDeviceService],
      controllers: [SmartHubDeviceController],
    }).compile();

    controller = module.get(SmartHubDeviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
