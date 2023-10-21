import { Injectable } from '@nestjs/common';
import { PrismaService } from '@smart-home/api/shared/infrastructure';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthorizedUser } from '@smart-home/shared/user/util-user-vm';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(
    login: string,
    password: string
  ): Promise<AuthorizedUser | null> {
    const user = await this.prisma.userSchema.findFirst({ where: { login } });

    if (user && this.validatePassword(password, user.passwordHash)) {
      return {
        id: user.id,
        name: user.name,
        role: user.role,
        hasChangedPassword: user.hasChangedPassword,
        homeId: user.homeId,
      };
    }

    return null;
  }

  login(user: AuthorizedUser) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  private validatePassword(password: string, userPassword: string): boolean {
    return bcrypt.compare(password, userPassword);
  }
}
