import { Test } from '@nestjs/testing';
import { SceneController } from './scene.controller';

describe('SceneController', () => {
  let controller: SceneController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [SceneController],
    }).compile();

    controller = module.get(SceneController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
