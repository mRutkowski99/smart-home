import { Test } from '@nestjs/testing';
import { HomesController } from './homes.controller';

describe('HomesController', () => {
  let controller: HomesController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [HomesController],
    }).compile();

    controller = module.get(HomesController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
