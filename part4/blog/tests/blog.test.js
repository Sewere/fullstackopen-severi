const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the unique identifier is named id instead of _id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
    expect(blog._id).toBeUndefined()
  })
})

test('the blog count rises when a new blog is added', async () => {
  const newBlog = {
    title: 'test blog',
    author: 'test author',
    url: 'http://test.com',
    likes: 5
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
})

describe('testing deletion', () => {

  test('deleting a single blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const ids = blogsAtEnd.map(b => b.id)
    expect(ids).not.toContain(blogToDelete.id)
  })

  test('deleting a blog with wrong id', async () => {
    const nonExistingId = await helper.nonExistingId()
    
    await api
      .delete(`/api/blogs/${nonExistingId}`)
      .expect(404)
  })
})

test('updating an existing blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlogData = {
    title: 'test title2',
    author: 'test author2',
    url: 'http://test.com/2',
    likes: 200
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlogData)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)

  expect(updatedBlog).toBeDefined()
  expect(updatedBlog.title).toBe(updatedBlogData.title)
  expect(updatedBlog.author).toBe(updatedBlogData.author)
  expect(updatedBlog.url).toBe(updatedBlogData.url)
  expect(updatedBlog.likes).toBe(updatedBlogData.likes)
})

afterAll(() => {
  mongoose.connection.close()
})
