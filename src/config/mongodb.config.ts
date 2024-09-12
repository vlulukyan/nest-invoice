import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getTypeOrmMongoConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mongodb',
  url: configService.get<string>('MONGODB_URI'),
  useNewUrlParser: true,
  useUnifiedTopology: true,
  database: configService.get<string>('DB_NAME'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
});