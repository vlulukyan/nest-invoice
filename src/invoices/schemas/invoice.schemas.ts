import { Item } from '../interfaces/item.interface';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Invoice>;

@Schema()
export class Invoice {
    @Prop()
    customer: string;
  
    @Prop()   
    amount: number;

    @Prop()
    reference: string;

    @Prop()
    date: Date;

    @Prop()
    items: Item[]
}

export const CatSchema = SchemaFactory.createForClass(Invoice);