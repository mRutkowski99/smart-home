import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UsePipes,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JoiValidationPipe } from '@smart-home/api/core/shared/pipes/validation';
import {
  GetHomeQuery,
  GetHomesQuery,
  UpdateGeolocationCommand,
  updateGeolocationValidator,
} from '@smart-home/api/homes/utils';
import { UpdateGeolocationDto } from '@smart-home/shared/data-access';

@Controller('homes')
export class HomesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Get()
  getHomes() {
    return this.queryBus.execute(new GetHomesQuery());
  }

  @Get(':id')
  getHomeWithIncludes(@Param('id', ParseIntPipe) id: number) {
    return this.queryBus.execute(new GetHomeQuery(id));
  }

  @UsePipes(new JoiValidationPipe(updateGeolocationValidator))
  @Put(':id/geolocation')
  updateGeolocation(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGeolocationDto
  ) {
    return this.commandBus.execute(
      new UpdateGeolocationCommand(id, dto.zipCode)
    );
  }
}
