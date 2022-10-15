import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateGeolocationCommand } from '@smart-home/api/homes/utils';
import { BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '@smart-home/api/core/shared/services/prisma-service';
import { WeatherApiService } from '@smart-home/api/core/shared/services/waether-api';

@CommandHandler(UpdateGeolocationCommand)
export class UpdateGeolocationHandler
  implements ICommandHandler<UpdateGeolocationCommand>
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly weatherApiService: WeatherApiService
  ) {}

  async execute(command: UpdateGeolocationCommand) {
    Logger.log(`Executing command: ${JSON.stringify(command)}`);

    const { homeId, zipCode } = command;

    try {
      await this.prisma.home.findUniqueOrThrow({
        where: { id: homeId },
      });
    } catch {
      Logger.log(`Home with id ${homeId} not found`);
      throw new BadRequestException();
    }

    const geolocation = await this.weatherApiService.getGeolocation(zipCode);

    await this.prisma.home.update({
      where: { id: homeId },
      data: {
        city: geolocation.name,
        zipCode,
        lat: geolocation.lat,
        lng: geolocation.lng,
      },
    });
  }
}
