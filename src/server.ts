import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use('/api/auth', authRoutes)

app.get('/', (_, res) => res.send('Hello World!'))

app.listen(5000, async () => {
  console.log('Server is running on 5000')
  try {
    await createConnection()
    console.log('Database connected!')
  } catch (error) {
    console.log(error)
  }
})
