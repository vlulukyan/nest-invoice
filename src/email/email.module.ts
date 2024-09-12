import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailSenderService } from './email.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ConfigService, EmailSenderService]
})

export class EmailModule {}
