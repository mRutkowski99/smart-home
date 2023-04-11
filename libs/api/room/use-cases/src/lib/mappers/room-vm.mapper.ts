import { Injectable } from '@nestjs/common';
import { Room } from '@smart-home/api/room/domain';
import { RoomVm } from '@smart-home/shared/room/util-room-vm';

@Injectable()
export class RoomVmMapper {
  map(entity: Room): RoomVm {
    return {
      id: entity.id.value,
      name: entity.name.value,
      humidity: 60,
      temperature: 22,
      devices: [...entity.devices],
    };
  }

  mapAll(entities: Room[]): RoomVm[] {
    return entities.map(this.map);
  }
}
