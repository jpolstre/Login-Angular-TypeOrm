import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express'
import { Connection } from 'typeorm'
import AuthController from '../controller/AuthController'




export default (conn: Connection) => {

  const routes = Router()
  const controller = AuthController(conn)


  routes.post('/login', controller.login)
  routes.post('/change-password', [checkJwt], controller.changePassword)
  return routes
}