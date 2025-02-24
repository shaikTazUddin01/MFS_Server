import { Router } from 'express'
import { authRouter } from '../module/Auth/auth.router'

const router = Router()

const modulesRoutes = [
  {
    path: '/auth',
    pathRoute: authRouter,
  }
  
]

modulesRoutes.forEach(route => router.use(route?.path, route?.pathRoute))

export default router