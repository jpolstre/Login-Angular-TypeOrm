import { checkJwt } from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

import { Router } from 'express';
import { Connection } from 'typeorm';

import userController from '../controller/UserController';

export default (conn: Connection) => {
  const router = Router();

  const controller = userController(conn);

  //La peticiones a este recurso(getAll en este caso) deben ser con auth(token) en el header, obtenido solo guando el usuario se loguea.
  //Con el middleware checkJwt, se verifica que el token sea valido y este firmado.
  //El middleware checkRole controla que solo los usuarios con rol de admin puedan crear nuevos usuarios.

  //osea el usuario debe estar logueado (y debe poseer un token) y debe ser administrador.
  router.get('/', [checkJwt, checkRole(['ADMIN'])], controller.getAll);

  router.get('/:id', [checkJwt, checkRole(['ADMIN'])], controller.getOne);

  router.post('/', [checkJwt, checkRole(['ADMIN'])], controller.create);

  router.patch('/:id', [checkJwt, checkRole(['ADMIN'])], controller.update);

  router.delete('/:id', [checkJwt, checkRole(['ADMIN'])], controller.remove);

  return router;
};
