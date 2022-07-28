const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const userForToken = {
  username: helper.initialUsers[0].username,
  id: helper.initialUsers[0]._id,
}

const token = jwt.sign(
  userForToken,
  process.env.SECRET
)

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

  test('blogs are returnes as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs have id field', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })

  describe('addition of a new blog', () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'https://testsiteabcde.com/',
        likes: 2
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const dbBlogs = await helper.blogsInDb()

      expect(dbBlogs).toHaveLength(helper.initialBlogs.length + 1)
      const contents = dbBlogs.map(blog => blog.author)
      expect(contents).toContain('Test Author')
    })

    test('likes defaults to 0', async () => {
      const newBlog = {
        title: 'Test2 Title2',
        author: 'Test2 Author2',
        url: 'https://testsiteabcdedas.com/',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const dbBlogs = await helper.blogsInDb()

      const found = dbBlogs.find(blog => blog.title === 'Test2 Title2' && blog.author === 'Test2 Author2')
      expect(found.likes).toBe(0)
    })

    test('a invalid blog is not added', async () => {
      const newBlog = {
        author: 'Test Author',
        likes: 2
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(400)

      const dbBlogs = await helper.blogsInDb()
      expect(dbBlogs).toHaveLength(helper.initialBlogs.length)
    })

    test('a blog is not added when unauthorized', async () => {
      const newBlog = {
        title: 'Test2 Title2',
        author: 'Test2 Author2',
        url: 'https://testsiteabcdedas.com/',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const dbBlogs = await helper.blogsInDb()
      expect(dbBlogs).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204)

      const blogsInDb = await helper.blogsInDb()
      expect(blogsInDb).toHaveLength(helper.initialBlogs.length - 1)
    })


    test('succeeds with status code 401 if not owner', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[2]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(401)
    })
  })

  describe('modifying a blog', () => {
    test('blogs data is changed', async () => {
      const modifyBlog = {
        title: 'Aa Bb',
        author: 'Cc Dd',
        url: 'https://tasestsiteabcdedas.com/',
        likes: 5
      }

      const blogsAtStart = await helper.blogsInDb()
      const blogToModify = blogsAtStart[0]

      await api
        .put(`/api/blogs/${blogToModify.id}`)
        .send(modifyBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})