import { Router } from 'express'
import { authRouter } from '../module/Auth/auth.router'
import { TransactionRouter } from '../module/transaction/transaction.router'
import { RechargeRequestRouter } from '../module/rechargeRequest/rechargeRequest.router'
import { withdrawRequestRouter } from '../module/withdrawRequest/withdrawRequest.router'

const router = Router()

const modulesRoutes = [
  {
    path: '/auth',
    pathRoute: authRouter,
  },
  {
    path: '/transaction',
    pathRoute: TransactionRouter,
  },
  {
    path: '/rechargeRequest',
    pathRoute: RechargeRequestRouter,
  },
  {
    path: '/withdrawRequest',
    pathRoute: withdrawRequestRouter,
  }
  
]

modulesRoutes.forEach(route => router.use(route?.path, route?.pathRoute))

export default router