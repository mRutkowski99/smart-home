import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {PrismaService} from "@smart-home/api/shared/infrastructure";

@Injectable()
export class UserRoleGuard implements CanActivate {

    constructor(private prisma: PrismaService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const {user} = context.switchToHttp().getRequest();

        const userEntity = await this.prisma.userSchema.findUnique({where: {id: user.id}})
        return userEntity.role === 'User';
    }

}