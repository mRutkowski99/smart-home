import { Module } from '@nestjs/common';
import { ApiShellFeatureModule } from '@smart-home/api/shell/feature';
import {WebsocketGateway} from "@smart-home/api/shared/infrastructure";

@Module({
  imports: [ApiShellFeatureModule],
  providers: [WebsocketGateway]
})
export class AppModule {
}

