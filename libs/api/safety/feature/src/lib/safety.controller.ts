import { Controller } from '@nestjs/common';
import { Get, Param, Patch, Query } from '@nestjs/common/decorators';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  GetSafetyByHomeQuery,
  GetSafetyWithLogsQuery,
  ConfirmSafetyLogCommand,
} from '@smart-home/api/safety/cqrs';
import { SafetyDto, SafetyWithLogsDto } from '@smart-home/shared/dto';
import { GetWithLogsQuery } from '@smart-home/shared/requests';

@Controller('safety')
export class SafetyController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @Get('all/:homeId')
  async getSafetyByHome(@Param('homeId') homeId: string): Promise<SafetyDto[]> {
    return await this.queryBus.execute<GetSafetyByHomeQuery, SafetyDto[]>(
      new GetSafetyByHomeQuery(homeId)
    );
  }

  @Get(':id/logs')
  async getWithLogs(
    @Param('id') id: string,
    @Query() query: GetWithLogsQuery
  ): Promise<SafetyWithLogsDto> {
    return await this.queryBus.execute<
      GetSafetyWithLogsQuery,
      SafetyWithLogsDto
    >(new GetSafetyWithLogsQuery(id, query.from, query.onlyDanger));
  }

  @Patch(':id/confirm/:logId')
  async confirmLog(
    @Param('id') id: string,
    @Param('logId') logId: string
  ): Promise<void> {
    return await this.commandBus.execute<ConfirmSafetyLogCommand, void>(
      new ConfirmSafetyLogCommand(id, logId)
    );
  }
}
