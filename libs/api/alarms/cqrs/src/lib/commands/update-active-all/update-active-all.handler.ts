import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  AlarmsRepository,
  AlarmSchemaFactory,
} from '@smart-home/api/alarms/infrastructure';
import { UpdateActiveForAllCommand } from './update-active-all.command';

@CommandHandler(UpdateActiveForAllCommand)
export class UpdateActiveForAllHandler
  implements ICommandHandler<UpdateActiveForAllCommand>
{
  constructor(
    private readonly repository: AlarmsRepository,
    private readonly factory: AlarmSchemaFactory,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(command: UpdateActiveForAllCommand): Promise<void> {
    const { homeId, state } = command;

    const alarms = (await this.repository.findAllByHomeId(homeId))
      .map((alarm) => this.factory.createFromSchema(alarm, [], []))
      .map((alarm) => this.eventPublisher.mergeObjectContext(alarm));

    alarms.forEach(async (alarm) => {
      if (state === 'active') alarm.activate();
      if (state === 'default') alarm.setToDefault();
      alarm.commit();

      await this.repository.findAndReplace(
        alarm.id,
        ...this.factory.create(alarm)
      );
    });
  }
}
