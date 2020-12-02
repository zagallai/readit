import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth'
import trim from './middleware/trim'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(trim)
app.use(cookieParser())

app.get('/', (_, res) => res.send('Hello World!'))
app.use('/api/auth', authRoutes)

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on ${process.env.PORT}`)
  try {
    await createConnection()
    console.log('Database connected!')
  } catch (error) {
    console.log(error)
  }
})
