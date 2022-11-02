import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  AlarmSchemaFactory,
  AlarmsRepository,
} from '@smart-home/api/alarms/infrastructure';
import { ConfirmLogCommand } from './confirm-log.command';

@CommandHandler(ConfirmLogCommand)
export class ConfirmLogHandler implements ICommandHandler<ConfirmLogCommand> {
  constructor(
    private readonly repository: AlarmsRepository,
    private readonly factory: AlarmSchemaFactory,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(command: ConfirmLogCommand): Promise<void> {
    const { id, logId, userId } = command;

    const alarm = this.eventPublisher.mergeObjectContext(
      this.factory.createFromSchema(
        await this.repository.findAlarmById(id),
        [],
        []
      )
    );

    alarm.confirm(logId, userId);
    alarm.commit();

    await this.repository.findAndReplace(
      alarm.id,
      ...this.factory.create(alarm)
    );
  }
}
