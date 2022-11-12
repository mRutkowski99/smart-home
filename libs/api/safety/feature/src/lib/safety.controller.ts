import { Controller } from '@nestjs/common';
import { Get, Param } from '@nestjs/common/decorators';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetSafetyByHomeQuery } from '@smart-home/api/safety/cqrs';
import { SafetyDto } from '@smart-home/shared/dto';

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
}
