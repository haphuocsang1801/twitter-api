import express from 'express'
import userRouter from '@/routes/users.routers'
import databaseServices from '@/services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
const port = 3000

const app = express()
databaseServices.connect().catch(console.dir)
app.use(express.json())
app.use('/users', userRouter)
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
