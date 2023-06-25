import { Injectable } from '@nestjs/common';
import { PrismaService } from '@smart-home/api/shared/infrastructure';
import { Alarm } from '@smart-home/api/alarm/domain';
import { alarmFactory } from './alarm.factory';

@Injectable()
export class AlarmRepository {
  constructor(private prisma: PrismaService) {}

  async getByHomeId(homeId: string): Promise<Alarm | null> {
    return alarmFactory(
      await this.prisma.alarmSchema.findUnique({ where: { homeId } })
    );
  }

  async getById(id: string): Promise<Alarm | null> {
    return alarmFactory(
      await this.prisma.alarmSchema.findUnique({ where: { id } })
    );
  }

  async update(entity: Alarm) {
    await this.prisma.alarmSchema.update({
      where: { id: entity.id.value },
      data: {
        state: entity.state,
        stateAddress: entity.stateAddress,
        stateAddressType: entity.stateAddressType,
        status: entity.status,
        statusAddress: entity.statusAddress,
        statusAddressType: entity.statusAddressType
      },
    });
  }
}
