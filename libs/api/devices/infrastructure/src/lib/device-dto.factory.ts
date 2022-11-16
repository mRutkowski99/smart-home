import { Injectable } from '@nestjs/common';
import { DeviceSchema, TemperatureDeviceSchema } from '@prisma/client';
import { PercentValue, TemperatureValue } from '@smart-home/api/devices/domain';
import {
  BooleanValueDeviceDto,
  PercentValueDeviceDto,
  TemperatureDeviceDto,
} from '@smart-home/shared/dto';

@Injectable()
export class DeviceDtoFactory {
  toBooleanValueDeviceDto(schema: DeviceSchema): BooleanValueDeviceDto {
    return new BooleanValueDeviceDto(
      schema.id,
      schema.roomId,
      schema.name,
      schema.type,
      schema.value === 1
    );
  }

  toPercentValueDeviceDto(schema: DeviceSchema): PercentValueDeviceDto {
    return new PercentValueDeviceDto(
      schema.id,
      schema.roomId,
      schema.name,
      schema.type,
      schema.value,
      PercentValue.min,
      PercentValue.max
    );
  }

  toTemperatureDeviceDto(
    schema: TemperatureDeviceSchema,
    ecoValue: TemperatureValue
  ): TemperatureDeviceDto {
    return new TemperatureDeviceDto(
      schema.id,
      schema.roomId,
      schema.name,
      schema.value,
      TemperatureValue.min,
      TemperatureValue.max,
      schema.state,
      schema.heatingValue,
      schema.coolingValue,
      ecoValue.value
    );
  }
}
