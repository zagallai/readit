import { Request, Response, Router } from 'express'
import { isEmpty } from 'class-validator'
import { getRepository } from 'typeorm'

import auth from '../middleware/auth'
import Post from '../entities/Post'
import Sub from '../entities/Sub'
import User from '../entities/User'

const createSub = async (req: Request, res: Response) => {
  const { name, title, description }: Sub = req.body
  const user: User = res.locals.user

  try {
    let errors: any = {}
    if (!isEmpty(name)) {
      const sub = await getRepository(Sub)
        .createQueryBuilder('sub')
        .where('lower(sub.name) = :name', { name: name.toLowerCase() })
        .getOne()
      if (sub) errors.name = 'Sub already exists'
    } else {
      errors.name = 'Name must not be empty'
    }

    if (isEmpty(title)) errors.title = 'Title must not be empty'
    if (Object.keys(errors).length > 0) throw errors
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
  }

  try {
    const sub = new Sub({ name, title, description, user })
    await sub.save()
    return res.json(sub)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong!' })
  }
}

const router = Router()
router.post('/', auth, createSub)

export default router
