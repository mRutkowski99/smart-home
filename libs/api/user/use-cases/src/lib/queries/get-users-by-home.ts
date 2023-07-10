import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {UserVm} from "@smart-home/shared/user/util-user-vm";
import {UserRepository} from "@smart-home/api/user/infrastructure";
import {UserVmMapper} from "../mappers/user-vm.mapper";

export class GetUsersByHomeQuery {
    constructor(public readonly homeId: string) {
    }
}

@QueryHandler(GetUsersByHomeQuery)
export class GetUsersByHomeHandler implements IQueryHandler<GetUsersByHomeQuery, UserVm[]> {

    constructor(private repository: UserRepository, private mapper: UserVmMapper) {
    }

    async execute({homeId}: GetUsersByHomeQuery): Promise<UserVm[]> {
        return this.mapper.mapAll(await this.repository.getAllByHomeId(homeId))
    }
}