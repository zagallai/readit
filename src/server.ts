import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth'
import postRoutes from './routes/posts'
import subRoutes from './routes/subs'
import trim from './middleware/trim'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(morgan('dev'))
app.use(trim)
app.use(cookieParser())

app.get('/', (_, res) => res.send('Hello World!'))
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/subs', subRoutes)

app.listen(port, async () => {
  console.log(`Server is running on ${port}`)
  try {
    await createConnection()
    console.log('Database connected!')
  } catch (error) {
    console.log(error)
  }
})
