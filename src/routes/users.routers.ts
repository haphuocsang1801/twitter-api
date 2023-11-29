import { loginController, registerController } from '@/controllers/users.controllers'
import { loginValidator, registerValidator } from '@/middlewares/users.middlwares'
import { wrapRequestHandler } from '@/utils/handlers'
import { Router } from 'express'

const router = Router()

router.post('/login', loginValidator, wrapRequestHandler(loginController))
// router.post('/register', registerValidator, registerController)
router.post('/register', registerValidator, wrapRequestHandler(registerController))
export default router
