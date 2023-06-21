import { Test } from '@nestjs/testing';
import { SmartHubSceneService } from './smart-hub-scene.service';

describe('SmartHubSceneService', () => {
  let service: SmartHubSceneService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SmartHubSceneService],
    }).compile();

    service = module.get(SmartHubSceneService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
