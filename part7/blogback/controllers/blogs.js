const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

router.get('/api/blogs', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

router.post('/api/blogs', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), "Seppo"/*process.env.SECRET*/)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      user: user.id
    })
    const savedBlog = await blog.save()

    await savedBlog.populate('user')

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

router.delete('/api/blogs/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const deletedBlog = await Blog.findByIdAndDelete(id)
    if (!deletedBlog) {
      return response.status(404).json({ error: 'Blog not found' })
    }
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.put('/api/blogs/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const { title, author, url, likes } = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, author, url, likes },
      { new: true }
    )
    if (!updatedBlog) {
      return response.status(404).json({ error: 'Blog not found' });
    }
    response.json(updatedBlog);
  } catch (error) {
    next(error)
  }
})

module.exports = router