import { getRepository } from "typeorm";
// NextFunction, Response
import { Request, Response } from "express";
import Category from "../entity/Category";

export class CategoryController {

    private categoryRepository = getRepository(Category);
    // request: Request, response: Response, next: NextFunction
    async all() {
        return this.categoryRepository.find();
    }

    async one(request: Request) {
        return this.categoryRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response) {
        try {
            this.categoryRepository.save(request.body);
            console.log('request.body.id', request.body.id);
            if (request.body.id) {
                return { msg: 'ok, categoria actualizada con exitosss' }
            } else {

                return { msg: 'ok, categoria creada con exito' }
            }
        } catch (error) {
            console.log(error);
            return { msg: 'ocurrio algun error!!!' }
        }

    }

    async remove(request: Request, response: Response) {
        let categoryToRemove = await this.categoryRepository.findOne(request.params.id);
        this.categoryRepository.remove(categoryToRemove);
        return { msg: 'ok, categoria eliminada' }
    }
    // async update(request: Request) {
    //     let categoryToUpdate = await this.categoryRepository.findOne(request.params.id);
    //     categoryToUpdate.firstName = request.body.firstName
    //     categoryToUpdate.lastName = request.body.lastName
    //     categoryToUpdate.age = request.body.age
    //     await this.categoryRepository.save(categoryToUpdate);

    //     return this.categoryRepository.find()
    // }

}