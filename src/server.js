import express from 'express'
import { router } from './router.js'

const app = express()

app.use(express.json())
app.use('/api/v1', router)

const PORT = process.env.SERVER_PORT ?? 3030
app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`)
})
