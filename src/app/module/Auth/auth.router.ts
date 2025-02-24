import { Router } from "express"
import { authController } from "./auth.controller"

const router = Router()

router.post('/createUser',authController.createUser)
router.post('/login',authController.loginUser)



export const authRouter = router