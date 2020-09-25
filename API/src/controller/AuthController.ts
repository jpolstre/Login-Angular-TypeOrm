import { validate } from 'class-validator';
import { Repository, Connection } from 'typeorm';
import { Request, Response } from 'express';

import User from '../entity/User';

import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import user from '../routes/user';

class AuthController {
  private userRepository: Repository<User>

  constructor(conn: Connection) {
    this.userRepository = conn.getRepository(User)
  }

  //al ser estatico este metodo puede llamado sin necesida de instanciar un objeto (el objeto de esta clas y mediante este ser llamado )
  public login = async (req: Request, resp: Response) => {

    const { username, password } = req.body as User

    if (!(username && password)) {
      return resp.status(400).json({ message: 'User & Password are required!' })
    }

    let user: User

    try {
      user = await this.userRepository.findOneOrFail({ where: { username } })
    } catch (e) {
      return resp.status(400).json({ message: 'username or password incorrect!!' })
    }

    // check password
    if (!user.checkPassword(password)) {
      return resp.status(400).json({ message: 'username or password incorrect!!' })
    }

    //se firma y se devuelve el token
    const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, { expiresIn: '1h' })

    resp.json({ message: 'ok', token })
  }

  public changePassword = async (req: Request, res: Response) => {
    //con res.locals, se tiene acceso  la parte del token payload(tambien tiene header y signature) que en este caso contiene el objeto jwtPayload={userId, username}
    const { userId } = res.locals.jwtPayload
    const { oldPassword, newPassword } = req.body
    if (!(oldPassword && newPassword)) {
      return res.status(400).json({ message: 'Old password and new password required' })
    }

    let user: User
    try {
      user = await this.userRepository.findOneOrFail(userId)
    } catch (error) {
      return res.status(400).json({ message: 'Something goes wrong' })
    }

    //Check

    if (!user.checkPassword(oldPassword)) {
      return res.status(401).json({ message: 'Old password is incorrect' })
    }

    user.password = newPassword

    const errors = await validate(user, { validationError: { target: false, value: false } })
    if (errors.length > 0) {
      return res.status(400).json(errors)
    }

    //Has password

    user.hashPassword()

    this.userRepository.save(user)

    res.json({ message: 'Password change successfully' })

  }
}

export default (conn: Connection) => new AuthController(conn)