import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { ApiControllerPrefix } from '@smart-home/shared/util';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ChangePasswordPayload,
  CreateUserPayload,
} from '@smart-home/shared/user/util-user-payload';
import {
  ChangePasswordCommand,
  CreateUserCommand, DeleteUserCommand, GetUsersByHomeQuery,
  ResetPasswordCommand,
} from '@smart-home/api/user/use-cases';

@Controller(ApiControllerPrefix.User)
export class UserController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Get('home/:homeId')
  async getUsersByHomeId(@Param('homeId') homeId: string) {
    return this.queryBus.execute<GetUsersByHomeQuery>(new GetUsersByHomeQuery(homeId));
  }

  @Post()
  async createUser(@Body() payload: CreateUserPayload) {
    await this.commandBus.execute<CreateUserCommand>(
      new CreateUserCommand(
        payload.homeId,
        payload.login,
        payload.name,
        payload.role
      )
    );
  }

  @Put(':id/reset-password')
  async resetPassword(@Param('id') id: string) {
    await this.commandBus.execute<ResetPasswordCommand>(
      new ResetPasswordCommand(id)
    );
  }

  @Put(':id/change-password')
  async changePassword(
    @Param('id') id: string,
    @Body() payload: ChangePasswordPayload
  ) {
    await this.commandBus.execute<ChangePasswordCommand>(
      new ChangePasswordCommand(id, payload.password, payload.newPassword)
    );
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.commandBus.execute<DeleteUserCommand>(new  DeleteUserCommand(id))
  }
}
