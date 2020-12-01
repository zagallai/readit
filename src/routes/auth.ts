import { validate, ValidationError } from 'class-validator'
import { Request, Response, Router } from 'express'
import { User } from '../entities/User'

const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body

  try {
    let errors: any = {}
    const emailUser = await User.findOne({ email })
    const usernameUser = await User.findOne({ username })
    if (emailUser) errors.email = 'Email is already exists'
    if (usernameUser) errors.username = 'Username is already exists'
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors)
    }

    const user = new User({ email, username, password })
    errors = await validate(user)
    if (errors.length > 0) return res.status(400).json(errors)
    await user.save()
    return res.json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
    //{ error: 'An error was encountered' }
  }
}

const router = Router()
router.post('/register', register)

export default register
