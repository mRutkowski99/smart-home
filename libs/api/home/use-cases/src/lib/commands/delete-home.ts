import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {HomeRepository} from "@smart-home/api/home/infrastructure";

export class DeleteHomeCommand {
    constructor(public readonly id: string) {
    }
}

@CommandHandler(DeleteHomeCommand)
export class DeleteHomeHandler implements ICommandHandler<DeleteHomeCommand> {
    constructor(private repository: HomeRepository) {
    }

    async execute({id}: DeleteHomeCommand): Promise<void> {
        await this.repository.delete(id)
    }
}