import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  SafetyRepository,
  SafetySchemaFactory,
} from '@smart-home/api/safety/infrastructure';
import { ConfirmSafetyLogCommand } from './confirm-log.command';

@CommandHandler(ConfirmSafetyLogCommand)
export class ConfirmSafetyLogHandler
  implements ICommandHandler<ConfirmSafetyLogCommand>
{
  constructor(
    private readonly repository: SafetyRepository,
    private readonly factory: SafetySchemaFactory,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(command: ConfirmSafetyLogCommand): Promise<void> {
    const { id, logId } = command;
    const safety = this.eventPublisher.mergeObjectContext(
      this.factory.createFromSchema(await this.repository.findById(id))
    );

    safety.confirmLog(logId);
    safety.commit();

    await this.repository.findAndReplace(...this.factory.create(safety));
  }
}
