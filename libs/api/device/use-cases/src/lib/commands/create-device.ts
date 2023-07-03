import { AddressType, ControlledValue, ValueType } from '@prisma/client';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeviceRepository } from '@smart-home/api/device/infrastructure';
import { Device } from '@smart-home/api/device/domain';
import { DeviceValueType } from '@smart-home/shared/util';
import { deviceValueTypeMapper } from '@smart-home/api/shared/infrastructure';

export class CreateDeviceCommand {
  constructor(
    public readonly roomId: string,
    public readonly name: string,
    public readonly valueType: DeviceValueType,
    public readonly addresses: {
      address: string;
      addressType: AddressType;
      controlledValue: ControlledValue;
    }[]
  ) {}
}

@CommandHandler(CreateDeviceCommand)
export class CreateDeviceHandler
  implements ICommandHandler<CreateDeviceCommand>
{
  constructor(private repository: DeviceRepository) {}

  async execute(command: CreateDeviceCommand): Promise<void> {
    await this.repository.create(
      Device.create(
        command.roomId,
        command.name,
        deviceValueTypeMapper(command.valueType),
        command.addresses
      )
    );
  }
}
