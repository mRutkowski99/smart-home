import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {AlarmRepository} from "@smart-home/api/alarm/infrastructure";

export class DeleteAlarmCommand {
    constructor(public readonly id: string) {
    }
}

@CommandHandler(DeleteAlarmCommand)
export class DeleteAlarmHandler implements ICommandHandler<DeleteAlarmCommand> {

    constructor(private repository: AlarmRepository) {
    }

    async execute({id}: DeleteAlarmCommand): Promise<void> {
        await this.repository.delete(id);
    }

}