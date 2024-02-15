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

afterAll(() => {
  mongoose.connection.close()
})
