import { Router } from 'express'
import userRouter from './users/usersRoute'
import vendorRouter from './payment/vendorpayment'

const router = Router()

router.use(userRouter)
router.use(vendorRouter)

export default router