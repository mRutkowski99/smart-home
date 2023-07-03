import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeviceRepository} from "@smart-home/api/device/infrastructure";

export class DeleteDeviceCommand {
    constructor(public readonly id: string) {
    }
}

@CommandHandler(DeleteDeviceCommand)
export class DeleteDeviceHandler implements ICommandHandler<DeleteDeviceCommand> {

    constructor(private repository: DeviceRepository) {
    }

    async execute({id}: DeleteDeviceCommand) {
        await this.repository.delete(id);
    }
}