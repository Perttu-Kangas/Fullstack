const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returnes as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs have id field', async () => {
    const response = await api.get('/api/blogs')
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
        .expect(400)

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
        .expect(204)

      const blogsInDb = await helper.blogsInDb()
      expect(blogsInDb).toHaveLength(helper.initialBlogs.length - 1)
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
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})