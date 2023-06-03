import { Injectable } from '@nestjs/common';
import { Scene } from '@smart-home/api/scene/domain';
import { SceneOverviewVm } from '@smart-home/shared/scene/util-scene-vm';

@Injectable()
export class SceneOverviewVmMapper {
  map(domain: Scene): SceneOverviewVm {
    return {
      id: domain.id.value,
      name: domain.name.value,
      state: domain.state,
      scheduledForToday: domain.scheduledForToday,
      startTime: domain.schedule?.startTime,
    };
  }

  mapAll(domain: Scene[]): SceneOverviewVm[] {
    return domain.map(this.map);
  }
}
