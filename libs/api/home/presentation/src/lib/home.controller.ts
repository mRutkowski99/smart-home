import {Body, Controller, Delete, Get, Param, Post, UseGuards, Request, Logger} from "@nestjs/common";
import {ApiControllerPrefix} from "@smart-home/shared/util";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CreateHomeCommand, DeleteHomeCommand, GetAllQuery} from "@smart-home/api/home/use-cases";
import {HomeVm} from "@smart-home/shared/home/util-home-vm";
import {CreateHomePayload} from "@smart-home/shared/home/util-home-payload";
import {AdminRoleGuard, JwtAuthGuard} from "@smart-home/api/shared/auth";

@UseGuards(JwtAuthGuard, AdminRoleGuard)
@Controller(ApiControllerPrefix.Home)
export class HomeController {
    constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
    }

    @Get()
    getAll() {
        return this.queryBus.execute<GetAllQuery, HomeVm[]>(new GetAllQuery())
    }

    @Post()
    create(@Body() payload: CreateHomePayload) {
        return this.commandBus.execute<CreateHomeCommand>(new CreateHomeCommand(payload.name, payload.city))
    }

    @Delete(':id')
    deleteHome(@Param('id') id: string) {
        return this.commandBus.execute<DeleteHomeCommand>(new DeleteHomeCommand(id))
    }
}