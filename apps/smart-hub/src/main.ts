import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //     AppModule,
  //     {
  //       transport: Transport.KAFKA,
  //       options: {
  //         client: {
  //           brokers: ['localhost:9092']
  //         },
  //         consumer: {
  //           groupId: 'smart-home'
  //         }
  //       }
  //     }
  // )
  // await app.listen()
  const app = await NestFactory.create(AppModule);

  const microservice = app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'smart-home',
      },
    },
  });

  await app.startAllMicroservices()
    await app.listen(3001)
}

bootstrap();
