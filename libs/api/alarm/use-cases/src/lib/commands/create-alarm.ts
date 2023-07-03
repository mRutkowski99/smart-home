import { AddressType } from '@prisma/client';
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {AlarmRepository} from "@smart-home/api/alarm/infrastructure";

export class CreateAlarmCommand {
  constructor(
    public homeId: string,
    public stateAddress: string,
    public stateAddressType: AddressType,
    public statusAddress: string,
    public statusAddressType: AddressType
  ) {}
}

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmHandler implements ICommandHandler<CreateAlarmCommand> {

    constructor(private repository: AlarmRepository) {
    }

    async execute(command: CreateAlarmCommand): Promise<void> {
        await this.repository.create(command.homeId, command.stateAddress, command.stateAddressType, command.statusAddress, command.statusAddressType);
    }
}
