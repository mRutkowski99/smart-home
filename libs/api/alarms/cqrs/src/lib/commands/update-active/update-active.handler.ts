import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  AlarmSchemaFactory,
  AlarmsRepository,
} from '@smart-home/api/alarms/infrastructure';
import { UpdateActiveCommand } from './update-active.command';

@CommandHandler(UpdateActiveCommand)
export class UpdateActiveHandler
  implements ICommandHandler<UpdateActiveCommand>
{
  constructor(
    private readonly repository: AlarmsRepository,
    private readonly factory: AlarmSchemaFactory,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(command: UpdateActiveCommand): Promise<void> {
    const { id, state } = command;

    const alarm = this.eventPublisher.mergeObjectContext(
      this.factory.createFromSchema(
        await this.repository.findAlarmById(id),
        [],
        []
      )
    );

    state ? alarm.activate() : alarm.deactivate();
    alarm.commit();

    await this.repository.findAndReplace(
      alarm.id,
      ...this.factory.create(alarm)
    );
  }
}
