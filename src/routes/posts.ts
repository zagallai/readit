import { Request, Response, Router } from 'express'
import auth from '../middleware/auth'
import Post from '../entities/Post'
import Sub from '../entities/Sub'
import User from '../entities/User'

const createPost = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body
  const user: User = res.locals.user
  if (title.trim() === '') {
    return res.status(400).json({ Title: 'Title must not be empty' })
  }

  try {
    const subRow = await Sub.findOneOrFail({ name: sub })
    const post = new Post({ title, body, user, sub: subRow })
    await post.save()
    return res.json(post)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Something went wrong!' })
  }
}

const router = Router()
router.post('/', auth, createPost)

export default router
