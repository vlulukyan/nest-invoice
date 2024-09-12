import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { InvoicesService } from "./services/invoices.service";
import { CreateInvoiceDto } from "./dtos/createInvoice.dto";
import { ObjectId } from "typeorm";

@Controller('invoices')

export class InvoicesController {
    constructor(private readonly invoicesService: InvoicesService) {}
    
    @Post()
    async create(@Body() createInvoiceDto: CreateInvoiceDto) {
        return this.invoicesService.create(createInvoiceDto);
    }

    @Get()
    async findAll() {
        return this.invoicesService.findAll();
    }

    @Get('/:id')
    async findById(@Param('id') id: ObjectId) {
        return this.invoicesService.findById(id);
    }
}