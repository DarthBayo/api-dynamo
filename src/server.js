import express from 'express'
import dotenv from 'dotenv'
import { router } from './routes/router.js'

const app = express()
dotenv.config()

app.use(express.json())
app.use('/api/v1', router)

const PORT = process.env.SERVER_PORT ?? 3030
app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`)
})
