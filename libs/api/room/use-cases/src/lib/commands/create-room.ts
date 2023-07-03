import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {RoomRepository} from "@smart-home/api/room/infrastructure";

export class CreateRoomCommand {
    constructor(public readonly homeId: string, public readonly name: string) {
    }
}

@CommandHandler(CreateRoomCommand)
export class CreateRoomHandler implements ICommandHandler<CreateRoomCommand> {

    constructor(private repository: RoomRepository) {
    }

    async execute(command: CreateRoomCommand) {
        await this.repository.create(command.homeId, command.name);
    }
}