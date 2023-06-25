import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {AlarmRepository} from "@smart-home/api/alarm/infrastructure";
import {WebsocketGateway} from "@smart-home/api/shared/infrastructure";
import {throwIfNull} from "@smart-home/api/shared/util";
import {BadRequestException} from "@nestjs/common";
import {AlarmStatusChangedEvent} from "@smart-home/shared/alarm/util-alarm-event";

export class UpdateAlarmStatusCommand {
    constructor(public readonly homeId: string, public readonly value: boolean) {
    }
}

@CommandHandler(UpdateAlarmStatusCommand)
export class UpdateAlarmStatusHandler implements ICommandHandler<UpdateAlarmStatusCommand> {

    constructor(private repository: AlarmRepository, private publisher: EventPublisher, private socket: WebsocketGateway) {
    }

    async execute({homeId, value}: UpdateAlarmStatusCommand): Promise<void> {
        const alarm = this.publisher.mergeObjectContext(
            throwIfNull(
                await this.repository.getByHomeId(homeId),
                new BadRequestException('Alarm doesn\'t exist')
            )
        )

        alarm.status = value
        this.socket.sendEventToClients(new AlarmStatusChangedEvent(homeId))

        await this.repository.update(alarm)
    }

}