const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')

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

let books = [
  { title: "Pride and Prejudice", author: "Jane Austen", published: "1813", genre: "Romance" },
  { title: "Great Expectations", author: "Charles Dickens", published: "1861", genre: "Novel" },
  { title: "The Old Man and the Sea", author: "Ernest Hemingway", published: "1952", genre: "Fiction" },
  { title: "To the Lighthouse", author: "Virginia Woolf", published: "1927", genre: "Modernist" },
  { title: "War and Peace", author: "Leo Tolstoy", published: "1869", genre: "Historical Fiction" },
  { title: "Crime and Punishment", author: "Fyodor Dostoevsky", published: "1866", genre: "Psychological Fiction" },
  { title: "The Adventures of Huckleberry Finn", author: "Mark Twain", published: "1884", genre: "Adventure" },
  { title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", published: "1997", genre: "Fantasy" },
  { title: "1984", author: "George Orwell", published: "1949", genre: "Dystopian Fiction" },
  { title: "Murder on the Orient Express", author: "Agatha Christie", published: "1934", genre: "Mystery" }
]

let authors = [
  { name: "Jane Austen", born: "1775-12-16", bookcount: 6 },
  { name: "Charles Dickens", born: "1812-02-07", bookcount: 15 },
  { name: "Ernest Hemingway", born: "1899-07-21", bookcount: 10 },
  { name: "Virginia Woolf", born: "1882-01-25", bookcount: 9 },
  { name: "Leo Tolstoy", born: "1828-09-09", bookcount: 10 },
  { name: "Fyodor Dostoevsky", born: "1821-11-11", bookcount: 11 },
  { name: "Mark Twain", born: "1835-11-30", bookcount: 9 },
  { name: "J.K. Rowling", born: "1965-07-31", bookcount: 7 },
  { name: "George Orwell", born: "1903-06-25", bookcount: 6 },
  { name: "Agatha Christie", born: "1890-09-15", bookcount: 66 }
]

const typeDefs = `
  type Token {
    value: String!
  }

  type Book {
    title: String!
    author: Author!
    published: String!
    genres: [String!]
    id: ID!
  }

  type Author {
    id: ID!
    name: String!
    born: String
    bookcount: Int
  }

 input AuthorInput {
     name: String!
     born: String
     bookcount: Int
  }

  type Query {
    allBooks: [Book!]!
    findBook(title: String!): Book
    allAuthors: [Author!]!
    findAuthor(name: String!): Author
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
  }
`

const resolvers = {
  Query: {
    allBooks: async () => Book.find({}),
    findBook: async (root, { title }) => Book.findOne({title: title}),
    allAuthors: async () => {
      return Author.find({})
    },
    findAuthor: async (root, { name }) => Author.findOne({name: name})
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
    addBook: async (root, args) => {
      console.log("INside addBook")
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
      const author = new Author({ ...args })
      //authors.push(author)
      return author.save()
    },
	  editAuthor: async (root, args) => {
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
	  }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
