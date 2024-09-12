import { SchedulingService } from './scheduling.service';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatSchema, Invoice } from 'src/invoices/schemas/invoice.schemas';
import { InvoicesService } from 'src/invoices/services/invoices.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Invoice.name, schema: CatSchema }])],
  controllers: [],
  providers: [SchedulingService, ConfigService, InvoicesService]
})

export class SchedulingModule {}
