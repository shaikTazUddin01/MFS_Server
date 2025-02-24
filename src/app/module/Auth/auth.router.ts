import { Router } from "express"
import { multerUpload } from "../../config/multer.config"
import { authController } from "./auth.controller"



const router = Router()

router.post('/createUser',multerUpload.single('image'),authController.createUser)
router.get('/getUser',authController.getUser)
router.post('/login',authController.loginUser)
router.patch('/updateUser',authController.UpdateUser)


export const authRouter = router