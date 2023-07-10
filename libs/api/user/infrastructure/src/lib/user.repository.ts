import { Injectable } from '@nestjs/common';
import { PrismaService } from '@smart-home/api/shared/infrastructure';
import { User } from '@smart-home/api/user/domain';
import {userFactory} from "./user.factory";

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async getById(id: string): Promise<User | null> {
    const user = await this.prismaService.userSchema.findUnique({where: {id}})
    return user ? userFactory(user) : null
  }

  async getAllByHomeId(homeId: string): Promise<User[]> {
    return this.prismaService.userSchema.findMany({where: {homeId}})
        .then(users => users.map(user => userFactory(user)))
  }

  async isLoginInUse(login: string): Promise<boolean> {
    return !!(await this.prismaService.userSchema.findFirst({
      where: { login },
    }));
  }

  async create(user: User) {
    await this.prismaService.userSchema.create({
      data: {
        homeId: user.homeId.value,
        login: user.login,
        name: user.name,
        role: user.role,
        passwordHash: user.passwordHash,
        hasChangedPassword: user.hasChangedPassword,
      },
    });
  }

  async update(user: User) {
    await this.prismaService.userSchema.update({
      where: { id: user.id.value },
      data: {
        homeId: user.homeId.value,
        login: user.login,
        name: user.name,
        role: user.role,
        passwordHash: user.passwordHash,
        hasChangedPassword: user.hasChangedPassword,
      },
    });
  }

  async delete(id: string) {
    await this.prismaService.userSchema.delete({where: {id}});
  }
}
