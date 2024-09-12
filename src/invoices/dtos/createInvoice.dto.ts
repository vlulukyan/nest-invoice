import {IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import { Item } from "../interfaces/item.interface";

export class CreateInvoiceDto {
    @IsNotEmpty()
    @IsString()
    customer: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNotEmpty()
    @IsArray()
    items: Item[]
}