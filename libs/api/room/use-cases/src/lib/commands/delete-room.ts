import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {RoomRepository} from "@smart-home/api/room/infrastructure";

export class DeleteRoomCommand {
    constructor(public readonly roomId: string) {}
}

@CommandHandler(DeleteRoomCommand)
export class DeleteRoomCommandHandler implements ICommandHandler<DeleteRoomCommand>
{
    constructor(private readonly roomsRepository: RoomRepository) {}

    async execute({roomId}: DeleteRoomCommand): Promise<void>
    {
        await this.roomsRepository.delete(roomId);
    }
}