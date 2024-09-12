import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateInvoiceDto } from "../dtos/createInvoice.dto";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";
import { Invoice } from "../schemas/invoice.schemas";
import { Model } from "mongoose";

@Injectable()
export class InvoicesService {
    private client: ClientProxy;
    constructor(
        @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>
    ) {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: ['amqp://localhost:5672'],
              queue: 'daily_sales_report'
            },
          });
    }

    async create(createInvoiceDto: CreateInvoiceDto): Promise <Invoice> {
        const invoice = new this.invoiceModel(createInvoiceDto);

        return invoice.save();
    }

    async findAll(): Promise<Invoice[]> {
        return this.invoiceModel.find().exec();
    }

    async findById(id): Promise<Invoice> {
        const invoice = this.invoiceModel.findOne(id).exec()

        return invoice;
    }

    async generateDailyReport() {

        const now = new Date();
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const invoices = await this.invoiceModel.find({ date: { $gte: twentyFourHoursAgo, $lt: now }})
    
        // Calculate total sales and per item sales summary
        const totalSales = invoices.reduce((acc, invoice) => acc + invoice.amount, 0);
        const perItemSales = invoices.reduce((acc, invoice) => {
          invoice.items.forEach((item) => {
            if (!acc[item.sku]) {
              acc[item.sku] = { totalQuantity: 0 };
            }
            acc[item.sku].totalQuantity += item.qt;
          });
          return acc;
        }, {});
    
        // Prepare the report
        const report = {
          totalSales,
          perItemSales,
        };
    
        // Send the report to the RabbitMQ queue
        await this.client.emit('send-email', report);
      }
}