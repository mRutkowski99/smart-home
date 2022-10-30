import { Test } from '@nestjs/testing';
import { RoomController } from './room.controller';

describe('RoomController', () => {
  let controller: RoomController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [RoomController],
    }).compile();

    controller = module.get(RoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
