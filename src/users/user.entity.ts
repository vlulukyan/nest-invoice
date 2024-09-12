import { Entity, ObjectIdColumn, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()   
    email: string;

    @Column()
    passowrd: string
}