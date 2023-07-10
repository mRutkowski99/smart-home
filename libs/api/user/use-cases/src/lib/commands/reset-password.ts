import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UserRepository} from "@smart-home/api/user/infrastructure";
import {ConfigService} from "@nestjs/config";
import {throwIfNull} from "@smart-home/api/shared/util";
import {BadRequestException} from "@nestjs/common";
import * as bcrypt from 'bcrypt'

export class ResetPasswordCommand {
    constructor(public readonly id: string) {
    }
}

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler implements ICommandHandler<ResetPasswordCommand> {
    constructor(private repository: UserRepository, private configService: ConfigService) {
    }

    async execute({id}: ResetPasswordCommand): Promise<void> {
        const user = throwIfNull(
            await this.repository.getById(id),
            new BadRequestException('User doesn\'t exist')
        )

        await user.setPassword(this.configService.get<string>('DEFAULT_PASSWORD'))
        await this.repository.update(user)
    }
}