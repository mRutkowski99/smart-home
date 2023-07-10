import {Global, Module} from '@nestjs/common';
import {PrismaServiceModule} from "@smart-home/api/shared/infrastructure";
import {AuthService} from "./auth.service";
import {LocalStrategy} from "./local.strategy";
import {PassportModule} from "@nestjs/passport";
import {LocalAuthGuard} from "./local-auth.guard";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {AuthController} from "./auth.controller";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AdminRoleGuard} from "./admin-role.guard";
import {UserRoleGuard} from "./user-role.guard";

@Global()
@Module({
  imports: [PrismaServiceModule, PassportModule.register({ defaultStrategy: 'jwt'}), JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '120s' },
      })
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard, LocalAuthGuard, AdminRoleGuard, UserRoleGuard],
    controllers: [AuthController],
  exports: [AuthService, AdminRoleGuard, JwtAuthGuard, UserRoleGuard],
})
export class ApiSharedAuthModule {}
