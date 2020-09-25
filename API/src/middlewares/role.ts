import { getRepository } from 'typeorm';
import { Response, NextFunction } from "express"
import User from '../entity/User';

export const checkRole = (roles: Array<string>) => {
  return async (_, res: Response, next: NextFunction) => {

    const { userId } = res.locals.jwtPayload
    const userRepository = getRepository(User)

    let user: User

    try {
      user = await userRepository.findOneOrFail(userId)
    } catch (e) {
      return res.status(404).json({ message: 'User not Found' })
    }


    //Check

    const { role } = user
    if (roles.includes(role)) {
      next()
    } else {
      res.status(401).json({ message: 'Not Authorized' })
    }
  }
}