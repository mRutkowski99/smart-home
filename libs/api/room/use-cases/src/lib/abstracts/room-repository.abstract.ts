import { RoomDto, RoomOverviewDto } from '@smart-home/shared/room/util-dto';

export abstract class IRoomRepository {
  abstract getById(id: string): Promise<RoomDto | null>;

  abstract getAllOverview(homeId: string): Promise<RoomOverviewDto[]>;
}
