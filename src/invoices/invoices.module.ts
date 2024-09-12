import { Module } from "@nestjs/common";
import { InvoicesController } from "./invoices.controller";
import { InvoicesService } from "./services/invoices.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MongooseModule } from "@nestjs/mongoose";
import { CatSchema, Invoice } from "./schemas/invoice.schemas";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Invoice.name, schema: CatSchema }]),
        ClientsModule.register([
            {
              name: 'SALES_REPORT',
              transport: Transport.RMQ,
              options: {
                urls: ['amqp://localhost:5672'],
                queue: 'sales-report',
                queueOptions: {
                  durable: false
                },
              },
            },
          ]),
    ],
    controllers: [InvoicesController],
    providers: [InvoicesService],
    exports: [InvoicesService]
})
export class InvoicesModule {}