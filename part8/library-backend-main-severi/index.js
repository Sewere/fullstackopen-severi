const { ApolloServer } = require('@apollo/server')
const { AuthenticationError } = require('apollo-server-errors');
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    author: Author!
    published: String!
    genres: [String!]!
    id: ID!
  }

  type Author {
    id: ID!
    name: String!
    born: String
    bookcount: Int
  }

  type Query {
    allBooks: [Book!]!
    findBook(title: String!): Book
    allAuthors: [Author!]!
    findAuthor(name: String!): Author
    me: User
    findUser(username: String!): User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: String!
      genres: [String!]
    ): Book

    addAuthor(
      name: String!
      born: String!
      bookcount: Int!
    ): Author

    editAuthor(
      name: String!
      newBorn: String!
    ): Author

    createUser(
      username: String!
      password: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    allBooks: async () => {
      const books = await Book.find({})
      const updatedBooks = books.map(book => {
        if (!book.genres) {
          book.genres = []
        }
        return book
      })
      return updatedBooks
    },
    findBook: async (root, { title }) => Book.findOne({title: title}),
    allAuthors: async () => {
      return Author.find({})
    },
    findAuthor: async (root, { name }) => Author.findOne({name: name}),
    findUser: async (root, { username }) => {
      console.log(username)
      return User.findOne({username: username})
    }
  },
  Book: {
    author: async (root) => {
      try {
        const author = await Author.findById(root.author)
        return author
      } catch (error) {
        console.error('Error fetching author:', error)
        throw new Error('Failed to fetch author')
      }
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      console.log("Inside addBook", context)
      if (!context.token) {
        throw new AuthenticationError('Authentication required');
      }
      let author = await Author.findOne({ name: args.author })
      console.log(args.author)
      //const authorId = new mongoose.Types.ObjectId(args.author)
      //console.log("authori id", authorId)
      if (!author) {
        console.log("No author of that name found, creating it now...")
        author = new Author({ name: args.author, born: 0 })
        await author.save()
      }
      const book = new Book({ ...args, author: author._id })
      console.log("Made some stuff", book)
      return book.save()
    },
    addAuthor: (root, args) => {
      if (!context.token) {
        throw new AuthenticationError('Authentication required');
      }
      const author = new Author({ ...args })
      //authors.push(author)
      return author.save()
    },
	  editAuthor: async (root, args, context) => {
      if (!context.token) {
        throw new AuthenticationError('Authentication required');
      }
	    const { name, newBorn } = args
      //const author = authors.find(author => author.name === name)
      const author = await Author.findOne({name: name})
      if (!author) {
        return null
      }
      //const updatedAuthor = { ...author, born: newBorn }
      //authors = authors.map(a => a.name === name ? updatedAuthor : a)
      author.born = newBorn
      return author.save()
	  },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username })
      if (!user) {
        throw new Error('User not found')
      }

      const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
      if (!passwordCorrect) {
        throw new Error('Invalid password')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return {
        value: jwt.sign(userForToken, process.env.JWT_SECRET),
      }
    },
    createUser: async (root, { username, password, favoriteGenre }) => {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)

      const user = new User({
        username,
        passwordHash,
        favoriteGenre,
      })

      try {
        await user.save()
      } catch (error) {
        throw new Error('Username already exists')
      }

      return user
    },
  }
}

const GetAccessToken = function (request){
  const token = (request.headers.authorization || '').replace('BEARER ', '');
  return token;
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ( {req} ) => {
    return {
      token: GetAccessToken(req)
    }
    /*
    const token = req ? req.headers.authorization : null
    try {
      const decodedToken = jwt.verify(token.substring(7), process.env.JWT_SECRET);
      const loggedUser = await User.findOne({ username: decodedToken.username })
      return { loggedUser }
    } catch (error) {
      return { loggedUser: null, token };
    }
  */}
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
