import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {RoomDetailsVm} from "@smart-home/shared/room/util-room-vm";
import {RoomRepository} from "@smart-home/api/room/infrastructure";

export class GetRoomsDetailsQuery {
    constructor(public readonly homeId: string) {
    }
}

@QueryHandler(GetRoomsDetailsQuery)
export class GetRoomsDetailsHandler implements IQueryHandler<GetRoomsDetailsQuery, RoomDetailsVm[]> {

    constructor(private repository: RoomRepository) {
    }

    async execute({homeId}: GetRoomsDetailsQuery): Promise<RoomDetailsVm[]> {
        return this.repository.getRoomsDetails(homeId)
    }
}