import {Module} from "@nestjs/common";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [ClientsModule.register([
        {
            name: 'SMART-HUB',
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: 'smart-hub',
                    brokers: ['localhost:9092']
                },
                consumer: {
                    groupId: 'api'
                }
            }
        }
    ])],
    exports: [ClientsModule]
})
export class SmartHubClient {}