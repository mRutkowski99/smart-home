import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  SafetyRepository,
  SafetySchemaFactory,
} from '@smart-home/api/safety/infrastructure';
import { CreateSafetyLogCommand } from './create-log.command';

@CommandHandler(CreateSafetyLogCommand)
export class CreateSafetyLogHandler
  implements ICommandHandler<CreateSafetyLogCommand>
{
  constructor(
    private readonly repository: SafetyRepository,
    private readonly factory: SafetySchemaFactory,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(command: CreateSafetyLogCommand): Promise<void> {
    const { id, danger, disabled } = command;
    const safety = this.eventPublisher.mergeObjectContext(
      this.factory.createFromSchema(await this.repository.findById(id))
    );

    safety.addLog(danger, disabled);
    safety.commit();

    await this.repository.findAndReplace(...this.factory.create(safety));
  }
}
