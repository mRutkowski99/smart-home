import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UserRepository} from "@smart-home/api/user/infrastructure";
import {throwIfNull} from "@smart-home/api/shared/util";
import {BadRequestException} from "@nestjs/common";

export class ChangePasswordCommand {
    constructor(public readonly id: string, public readonly password: string, public readonly newPassword: string) {
    }
}

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler implements ICommandHandler<ChangePasswordCommand> {
    constructor(private repository: UserRepository) {
    }

    async execute(command: ChangePasswordCommand): Promise<any> {
        const user = throwIfNull(
            await this.repository.getById(command.id),
            new BadRequestException('User doesn\'t exist')
        )

        try {
            await user.changePassword(command.password, command.newPassword)
        } catch (e) {
            throw new BadRequestException(e)
        }

        await this.repository.update(user)
    }
}