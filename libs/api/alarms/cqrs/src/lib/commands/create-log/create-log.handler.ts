import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  AlarmSchemaFactory,
  AlarmsRepository,
} from '@smart-home/api/alarms/infrastructure';
import { CreateLogCommand } from './create-log.command';

@CommandHandler(CreateLogCommand)
export class CreateLogHandler implements ICommandHandler<CreateLogCommand> {
  constructor(
    private readonly repository: AlarmsRepository,
    private readonly factory: AlarmSchemaFactory,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(command: CreateLogCommand): Promise<void> {
    const { id, message, danger } = command;

    const alarm = this.eventPublisher.mergeObjectContext(
      this.factory.createFromSchema(
        await this.repository.findAlarmById(id),
        [],
        []
      )
    );

    alarm.addLog(message, danger);
    alarm.commit();

    await this.repository.findAndReplace(...this.factory.create(alarm));
  }
}
