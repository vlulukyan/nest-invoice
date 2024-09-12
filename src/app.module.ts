import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmMongoConfig } from './config/mongodb.config';
import { InvoicesModule } from './invoices/invoices.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulingModule } from './scheduler/scheduling.module';
import { SchedulingService } from './scheduler/scheduling.service';
import { EmailSenderService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/nest_invoices'),
    InvoicesModule,
    SchedulingModule,
    EmailModule
  ],
  controllers: [],
  providers: [SchedulingService, EmailSenderService],
})
export class AppModule {}
