import { DeviceValueType } from '@smart-home/shared/util';
import {AddressType, ControlledValue} from "@prisma/client";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeviceRepository} from "@smart-home/api/device/infrastructure";
import {throwIfNull} from "@smart-home/api/shared/util";
import {BadRequestException} from "@nestjs/common";
import {Name} from "@smart-home/api/shared/domain";

export class UpdateDeviceCommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly addresses: {
        address: string;
        addressType: AddressType;
        controlledValue: ControlledValue;
    }[]
  ) {}
}

@CommandHandler(UpdateDeviceCommand)
export class UpdateDeviceHandler implements ICommandHandler<UpdateDeviceCommand> {

    constructor(private repository: DeviceRepository) {
    }

    async execute(command: UpdateDeviceCommand): Promise<void> {
        const device = throwIfNull(
            await this.repository.getById(command.id),
            new BadRequestException('Device doesn\'t exist')
        );

        try {
            device.name = new Name(command.name);
            command.addresses.forEach(address => {
                device.updateAddress(address.address, address.addressType, address.controlledValue)
            })
        } catch (e) {
            throw new BadRequestException(e);
        }

        await this.repository.update(device);
    }
}