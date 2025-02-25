import { Router } from 'express'
import { authRouter } from '../module/Auth/auth.router'
import { TransactionRouter } from '../module/transaction/transaction.router'

const router = Router()

const modulesRoutes = [
  {
    path: '/auth',
    pathRoute: authRouter,
  },
  {
    path: '/transaction',
    pathRoute: TransactionRouter,
  }
  
]

modulesRoutes.forEach(route => router.use(route?.path, route?.pathRoute))

export default router