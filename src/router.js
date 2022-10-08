import { Router } from 'express'

const router = Router()

router.get('/user', async (req, res) => {
  return res.json({
    message: 'Hello, world'
  })
})

export {
  router
}
