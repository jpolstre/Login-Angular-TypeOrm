import { Connection, Repository } from "typeorm";
import { Request, Response } from "express";
import { validate } from "class-validator";
import User from "../entity/User";

class UserController {

    private userRepository: Repository<User>

    constructor(conn: Connection) {
        this.userRepository = conn.getRepository(User)
    }
    // req: Request, res: Response, next: NextFunction
    public getAll = async (_, res: Response) => {
        try {
            const users = await this.userRepository.find({ select: ['id', 'username'] });
            if (users.length > 0) {
                res.send(users)
            } else {
                res.status(404).json({ message: 'Not results' })
            }
        } catch (error) {
            res.status(401).json({ message: 'Something wrong' })
        }

    }

    public getOne = async (req: Request, res: Response) => {
        try {
            const user = await this.userRepository.findOneOrFail(req.params.id, { select: ['id', 'username'] });
            res.send(user)
        } catch (error) {
            return res.status(404).json({ message: 'User not found' })
        }
    }

    public create = async (req: Request, res: Response) => {

        const { username, password, role } = req.body as User

        const user = new User()
        user.username = username
        user.password = password
        user.role = role

        //Validate
        const errors = await validate(user, { validationError: { target: false, value: false } })
        if (errors.length > 0) {
            console.log('error', errors);
            return res.status(400).json(errors)
        }

        try {
            user.hashPassword()
            await this.userRepository.save(user);
            return res.status(201).json({ message: 'user create successfully' })

        } catch (error) {
            console.log('error', error);
            return res.status(409).json({ message: 'username already exist' })
        }

    }

    public update = async (req: Request, res: Response) => {

        const { id } = req.params
        const { username, role } = req.body as User

        let user: User

        try {
            user = await this.userRepository.findOneOrFail(id)
            user.username = username
            user.role = role

        } catch (e) {
            return res.status(404).json({ mesage: 'User not found' })
        }


        const errors = await validate(user, { validationError: { target: false, value: false } })

        if (errors.length > 0) {
            return res.status(400).json(errors)
        }

        try {
            await this.userRepository.save(user)
            return res.status(201).json({ message: 'user update successfully' })
        } catch (e) {
            return res.status(409).json({ message: 'Username already in use' })
        }

    }

    public remove = async (req: Request, res: Response) => {

        try {
            const user = await this.userRepository.findOne(req.params.id);
            await this.userRepository.remove(user);
        } catch (error) {
            return res.status(404).json({ message: 'user not found' })
        }

        return res.status(201).json({ message: 'user remove successfully' })
    }

}

export default (conn: Connection) => new UserController(conn)