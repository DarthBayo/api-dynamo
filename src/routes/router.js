import { Router } from 'express'

import { userRouter } from './user/user.routes.js'

const router = Router()

router.use('/user', userRouter)

export {
  router
}
