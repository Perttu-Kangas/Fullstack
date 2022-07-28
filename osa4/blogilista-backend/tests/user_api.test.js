const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some users saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

  describe('addition of a new user', () => {
    test('a valid user can be added', async () => {
      const newUser = {
        username: 'testuser',
        name: 'Test User',
        password: 'abcd1234',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const dbUsers = await helper.usersInDb()

      expect(dbUsers).toHaveLength(helper.initialUsers.length + 1)
      const contents = dbUsers.map(user => user.username)
      expect(contents).toContain('testuser')
    })

    test('a invalid username is not added', async () => {
      const newUser = {
        username: 'te',
        name: 'Test User',
        password: 'abcd1234',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const dbUsers = await helper.usersInDb()
      expect(dbUsers).toHaveLength(helper.initialUsers.length)
    })

    test('a invalid name is not added', async () => {
      const newUser = {
        username: 'tessss',
        name: 'Te',
        password: 'abcd1234',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const dbUsers = await helper.usersInDb()
      expect(dbUsers).toHaveLength(helper.initialUsers.length)
    })

    test('a duplicate invalid username is not added', async () => {
      const newUser = {
        username: 'OtherTest',
        name: 'My Name',
        password: 'abcsd1234',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const dbUsers = await helper.usersInDb()
      expect(dbUsers).toHaveLength(helper.initialUsers.length)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})