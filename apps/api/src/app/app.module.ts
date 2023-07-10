import { Module } from '@nestjs/common';
import { ApiShellFeatureModule } from '@smart-home/api/shell/feature';
import {WebsocketGateway} from "@smart-home/api/shared/infrastructure";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ApiShellFeatureModule, ConfigModule.forRoot({isGlobal: true})],
  providers: [WebsocketGateway]
})
export class AppModule {
}

