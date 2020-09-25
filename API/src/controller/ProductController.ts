import { getRepository } from "typeorm";
// NextFunction, Response
import { Request } from "express";
import Product from "../entity/Product";
import Category from "../entity/Category";

export class ProductController {

    private productRepository = getRepository(Product);
    private categoryRepository = getRepository(Category);
    // request: Request, response: Response, next: NextFunction
    async all() {
        return this.productRepository.find();
    }

    async one(request: Request) {
        return this.productRepository.findOne(request.params.id);
    }

    async save(request: Request) {
        console.log('request.body', request.body);
        const category = await this.categoryRepository.findOne({ where: { id: request.body.categoryId } });

        // if(!category){
        //     return {msg:'no se encontro la categoria'}
        // }

        let msg
        let prodData = {
            name: request.body.name,
            description: request.body.description,
            imgs: request.body.imgs,
            category: category,
        }
        // let product

        if (request.body.id) {
            prodData['id'] = request.body.id
            msg = { msg: 'ok, producto actualizado con exito' }

        } else {

            msg = { msg: 'ok, producto creado con exito' }

        }
        // product = this.productRepository.create(prodData);
        this.productRepository.save(prodData);
        return msg

    }

    async remove(request: Request) {
        let productToRemove = await this.productRepository.findOne(request.params.id);
        this.productRepository.remove(productToRemove);
        return { msg: 'ok, producto eliminado' }
    }
    // async update(request: Request) {
    //     let productToUpdate = await this.productRepository.findOne(request.params.id);
    //     productToUpdate.firstName = request.body.firstName
    //     productToUpdate.lastName = request.body.lastName
    //     productToUpdate.age = request.body.age
    //     await this.productRepository.save(productToUpdate);

    //     return this.productRepository.find()
    // }

}