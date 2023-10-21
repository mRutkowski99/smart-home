import { DayOfWeek, Time } from '@smart-home/shared/util';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SceneRepository } from '@smart-home/api/scene/infrastructure';
import {Inject, Logger} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SceneCreatedEvent } from '@smart-home/shared/scene/util-scene-event';
import { DeviceRepository } from '@smart-home/api/device/infrastructure';
import { ControlledValue } from '@prisma/client';

interface Schedule {
  dayOfWeek: DayOfWeek;
  time: Time;
}

export class CreateSceneCommand {
  constructor(
    public readonly homeId: string,
    public readonly name: string,
    public readonly schedule: { active: boolean; schedule: Schedule[] },
    public readonly devices: {
      deviceId: string;
      setpoint: number;
      state: boolean;
    }[]
  ) {}
}

@CommandHandler(CreateSceneCommand)
export class CreateSceneHandler implements ICommandHandler<CreateSceneCommand> {
  constructor(
    private repository: SceneRepository,
    private deviceRepository: DeviceRepository,
    @Inject('SMART-HUB') private smartHubClient: ClientKafka
  ) {}

  async execute(command: CreateSceneCommand): Promise<void> {
    const scene = await this.repository.create(command);
    const devices = await this.deviceRepository.getAll(command.homeId);

    this.smartHubClient.emit(
      SceneCreatedEvent.pattern,
      new SceneCreatedEvent(
        command.homeId,
        scene.id,
        command.schedule.schedule.map(this.createCron),
        command.schedule.active,
        command.devices.map((device) => {
          const stateAddress = devices
            .find((d) => d.id.value === device.deviceId)!
            .getAddress(ControlledValue.WRITE_STATE);
          const setpointAddress = devices
            .find((d) => d.id.value === device.deviceId)!
            .getAddress(ControlledValue.WRITE_SETPOINT);
          return {
            deviceId: device.deviceId,
            state: {
              value: device.state,
              address: stateAddress.address,
            },
            setpoint: {
              value: device.setpoint,
              address: setpointAddress.address,
              addressType: setpointAddress.addressType,
            },
          };
        })
      )
    );
  }

  private createCron(schedule: Schedule) {
    return `0 ${schedule.time.minutes} ${schedule.time.hours} * * ${schedule.dayOfWeek}`;
  }
}
