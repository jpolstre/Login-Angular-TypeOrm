import { Router } from 'express'
import { Connection } from 'typeorm';

import auth from './auth'
import user from './user'
// import product from './product'
// import category from './category'



export default (conn:Connection)=>{
  const routes = Router()

  //base routes
  routes.use('/auth', auth(conn))
  routes.use('/users', user(conn))
  // routes.use('/product', product)
  // routes.use('/category',category)

  return routes
}


