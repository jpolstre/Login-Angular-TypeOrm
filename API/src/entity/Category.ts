import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Product from './Product'

@Entity()
export default class Category {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: true })
    description?: string;
    //tiene muchos
    @OneToMany(() => Product, (product) => product.category)
    products: Product[];

}
