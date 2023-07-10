import {UserRole} from "@prisma/client";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UserRepository} from "@smart-home/api/user/infrastructure";
import {ConfigService} from "@nestjs/config";
import {BadRequestException} from "@nestjs/common";
import {User} from "@smart-home/api/user/domain";
import * as bcrypt from 'bcrypt'

export class CreateUserCommand {
    constructor(public readonly homeId: string, public readonly login: string, public readonly name: string, public readonly role: UserRole) {
    }
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {

    constructor(private repository: UserRepository, private configService: ConfigService) {
    }

    async execute(command: CreateUserCommand): Promise<void> {
        if (await this.repository.isLoginInUse(command.login))
            throw new BadRequestException('Login already in use')

        const passwordHash = await bcrypt.hash(this.configService.get<string>('DEFAULT_PASSWORD'), 10)

        const user = User.create(command.homeId, command.login, passwordHash, command.name, command.role)
        await this.repository.create(user)
    }
}