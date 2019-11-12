import { Module, Global, OnModuleInit } from '@nestjs/common';
import { CqrsModule, EventBus, RabbitMQBusAdapter } from '@kerthin/cqrs';
import { getPrototypes } from '@kerthin/utils';
import { DBModule } from '@infrastructure/database/module';

const services = getPrototypes(`${__dirname}/services/*{.ts,.js}`);

@Global()
@Module({
  imports: [
    DBModule,
    CqrsModule,
  ],
  providers: [
    ...services,
  ],
  exports: [
    ...services,
  ],
})
export class DomainModule implements OnModuleInit {

  constructor(private readonly eventBus: EventBus) { }

  async onModuleInit() {
    const exchange = 'user';
    const service = 'user-domain-service';
    const host = process.env.BUS_URL;

    await this.eventBus
      .setAdapter(new RabbitMQBusAdapter(exchange, host, service))
      .init();
  }

}
