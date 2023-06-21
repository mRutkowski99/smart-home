import { Test } from '@nestjs/testing';
import { SmartHubSceneController } from './smart-hub-scene.controller';
import { SmartHubSceneService } from './smart-hub-scene.service';

describe('SmartHubSceneController', () => {
  let controller: SmartHubSceneController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SmartHubSceneService],
      controllers: [SmartHubSceneController],
    }).compile();

    controller = module.get(SmartHubSceneController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
