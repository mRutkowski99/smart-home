import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {HomeRepository} from "@smart-home/api/home/infrastructure";

export class CreateHomeCommand {
    constructor(public readonly name: string, public readonly city: string) {
    }
}

@CommandHandler(CreateHomeCommand)
export class CreateHomeHandler implements ICommandHandler<CreateHomeCommand> {
    constructor(private repository: HomeRepository) {
    }

    async execute({name, city}: CreateHomeCommand): Promise<void> {
        await this.repository.create(city, name)
    }
}