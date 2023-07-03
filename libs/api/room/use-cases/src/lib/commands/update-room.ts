import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {RoomRepository} from "@smart-home/api/room/infrastructure";
import {throwIfNull} from "@smart-home/api/shared/util";
import {BadRequestException} from "@nestjs/common";
import {Name} from "@smart-home/api/shared/domain";

export class UpdateRoomCommand {
    constructor(public readonly id: string,
                public readonly name: string) {
    }
}

@CommandHandler(UpdateRoomCommand)
export class UpdateRoomHandler implements ICommandHandler<UpdateRoomCommand> {

    constructor(private repository: RoomRepository) {
    }

    async execute(command: UpdateRoomCommand) {
        const room = throwIfNull(
            await this.repository.getById(command.id),
            new BadRequestException('Room doesn\'t exist')
        )

        room.name = new Name(command.name)
        await this.repository.update(room)
    }
}