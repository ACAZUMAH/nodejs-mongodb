import { Router } from 'express'
import userRouter from './usersRoute'

const router = Router()

router.use(userRouter)

export default router