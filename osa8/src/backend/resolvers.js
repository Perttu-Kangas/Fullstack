const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const User = require('./models/user')
const Book = require('./models/book')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

require('dotenv').config()

const JWT_SECRET = process.env.SECRET

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author')
      }

      // "kyselyn allBooks parametrin author toimintaansaattaminen on vapaaehtoinen lisätehtävä!"
      // :)
      return Book.find({ genres: { $in: args.genre } }).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        try {
          const author2 = new Author({ name: args.author })
          author = await author2.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      try {
        const book = new Book({ ...args, author: author._id })
        const book2 = await book.save()
        book2.author = author

        pubsub.publish('BOOK_ADDED', { bookAdded: book2 })

        return book2
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        return await Author.findOneAndUpdate(
          { name: args.name },
          { born: parseInt(args.setBornTo) }
        )
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Author: {
    name: (root) => root.name,
    born: (root) => root.born ? root.born : 0,
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id })
      if (!books) {
        return 0
      }
      return books.length
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers