import { Router } from "express"
import { authController } from "./auth.controller"



const router = Router()

router.post('/createUser',authController.createUser)
router.get('/getUser',authController.getUser)
router.post('/login',authController.loginUser)
router.patch('/updateUser',authController.UpdateUser)


export const authRouter = router