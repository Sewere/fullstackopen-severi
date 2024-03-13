const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

usersRouter.post('/api/login', async (request, response) => {
  const { username, password } = request.body
  console.log("IN BACK",username, password )
  if (!username  || !password) {
    return response.status(400).json({ error: 'Username and password are required' })
  }
  const user = await User.findOne({ username })

  if (!user) {
    return response.status(401).json({ error: `Username ${username} not found` })
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    return response.status(401).json({ error: 'Invalid password' })
  }

  const token = jwt.sign({ id: user._id }, "SEPPO")

  response.status(200).json({ token, username: user.username, name: user.name })
})

usersRouter.post('/api/newuser', async (request, response) => {
  console.log("IN BACK")
  const { username, password } = request.body
  if (!username  || !password) {
    return response.status(400).json({ error: 'Username and password are required' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/api/users', async (request, response) => {
    const users = await User.find({}).populate('blogs', {title:1, likes:1})
    response.json(users)
  })

module.exports = usersRouter