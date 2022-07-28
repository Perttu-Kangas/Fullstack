const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '62e2c40de7ab57711e2de3ea',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '62e2c61e9cb5addf81bb2ece',
  },
  {
    _id: '62e29eb9d93cb400f1a0590d',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '62e2c61e9cb5addf81bb2ece',
  },
  {
    _id: '62e29eb9d93cb400f1a0590c',
    title: 'Go To Statement Considered Harmful2222',
    author: 'Edsger W. Dijkstra222',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html2222',
    likes: 5,
    user: '62e2c65c9cb5addf81bb2ed0',
  },
]

const initialUsers = [
  {
    _id: '62e2c61e9cb5addf81bb2ece',
    username: 'Test',
    name: 'Test Name',
    passwordHash: '$2b$10$NvolHWqzvzYUc5hTGw/0v.TJ0hyj0eFKd2F0cOBofl5Md/UJvkJYG',
    blogs: [
      '62e2c40de7ab57711e2de3ea',
      '62e29eb9d93cb400f1a0590d',
    ]
  },
  {
    _id: '62e2c65c9cb5addf81bb2ed0',
    username: 'OtherTest',
    name: 'Other Test',
    passwordHash: '$2b$10$iyKGVSmOO5OG/IZQV4H7H.BaEVjYpFzth0IyS8mqcFPOJF2MPWAFq',
    blogs: [
      '62e29eb9d93cb400f1a0590c',
    ]
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({}).populate('user')
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({}).populate('blogs')
  return users.map(users => users.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb,
  initialUsers, usersInDb
}