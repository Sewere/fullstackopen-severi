const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/api/blogs', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

router.post('/api/blogs', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
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