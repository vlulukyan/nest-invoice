// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { RabbitMQModuleOptions } from '@nestjs/rabbitmq';

// export const rabbitmqConfig = () => ({
//   uri: process.env.RABBITMQ_URI || 'amqp://localhost:5672',
//   // Other options as needed
// });

// export const RabbitMQModuleOptionsFactory = {
//   provide: 'RabbitMQModuleOptions',
//   useFactory: async (configService: ConfigService) => rabbitmqConfig(),
//   inject: [ConfigService],
// };