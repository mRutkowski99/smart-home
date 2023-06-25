import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AlarmRepository } from '@smart-home/api/alarm/infrastructure';
import { throwIfNull } from '@smart-home/api/shared/util';
import { BadRequestException, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AlarmStateChangedEvent } from '@smart-home/shared/alarm/util-alarm-event';

export class UpdateAlarmState {
  constructor(public readonly id: string, public readonly state: boolean) {}
}

@CommandHandler(UpdateAlarmState)
export class UpdateAlarmHandler implements ICommandHandler<UpdateAlarmState> {
  constructor(
    private repository: AlarmRepository,
    private publisher: EventPublisher,
    @Inject('SMART-HUB') private smartHubClient: ClientKafka
  ) {}

  async execute({ id, state }: UpdateAlarmState): Promise<void> {
    const alarm = this.publisher.mergeObjectContext(
      throwIfNull(
        await this.repository.getById(id),
        new BadRequestException("Alarm doesn't exist")
      )
    );

    alarm.state = state;
    this.smartHubClient.emit(
      AlarmStateChangedEvent.pattern,
      new AlarmStateChangedEvent(
        alarm.homeId.value,
        alarm.stateAddress,
        alarm.stateAddressType,
        alarm.state
      )
    );

    await this.repository.update(alarm);
  }
}
