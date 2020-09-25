import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Category from './Category'

@Entity()
export default class Product {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: false })
    description!: string;

    @Column({ nullable: false })
    imgs!: string;//separados por comas
    //pertenece a (belongsTo)
    @ManyToOne(() => Category, (category) => category.products, { cascade: true })
    @JoinColumn({ name: 'categoryId' })
    category: Category;

}
