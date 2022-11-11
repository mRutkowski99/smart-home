import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  AlarmsRepository,
  AlarmSchemaFactory,
} from '@smart-home/api/alarms/infrastructure';
import { UpdateDefaultStateCommand } from './update-default-state.command';

@CommandHandler(UpdateDefaultStateCommand)
export class UpdateDefaultStateHandler implements ICommandHandler {
  constructor(
    private readonly repository: AlarmsRepository,
    private readonly factory: AlarmSchemaFactory,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(command: UpdateDefaultStateCommand): Promise<void> {
    const { id, newDefaultState } = command;

    const alarm = this.eventPublisher.mergeObjectContext(
      this.factory.createFromSchema(
        await this.repository.findAlarmById(id),
        [],
        []
      )
    );

    alarm.defaultState = newDefaultState;
    alarm.commit();

    await this.repository.findAndReplace(...this.factory.create(alarm));
  }
}
