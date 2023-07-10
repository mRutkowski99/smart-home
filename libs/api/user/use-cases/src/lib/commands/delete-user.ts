import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UserRepository} from "@smart-home/api/user/infrastructure";

export class DeleteUserCommand {
    constructor(public readonly id: string) {}
}

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {

    constructor(private repository: UserRepository) {
    }

    async execute({id}: DeleteUserCommand): Promise<any> {
        await this.repository.delete(id)
    }

}