import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {HomeVm} from "@smart-home/shared/home/util-home-vm";
import {HomeRepository} from "@smart-home/api/home/infrastructure";
import {HomeVmMapper} from "../mappers/home-vm.mapper";

export class GetAllQuery {}

@QueryHandler(GetAllQuery)
export class GetAllHandler implements IQueryHandler<GetAllQuery, HomeVm[]> {
    constructor(private repository: HomeRepository, private mapper: HomeVmMapper) {
    }

    async execute(query: GetAllQuery): Promise<HomeVm[]> {
        return this.mapper.mapAll(await this.repository.getAll())
    }
}