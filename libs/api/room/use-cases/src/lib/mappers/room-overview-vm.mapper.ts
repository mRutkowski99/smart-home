import { Room } from '@smart-home/api/room/domain';
import { RoomOverviewVm } from '@smart-home/shared/room/util-room-vm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomOverviewVmMapper {
  map(entity: Room): RoomOverviewVm {
    return { id: entity.id.value, name: entity.name.value };
  }

  mapAll(entities: Room[]): RoomOverviewVm[] {
    return entities.map(this.map);
  }
}
