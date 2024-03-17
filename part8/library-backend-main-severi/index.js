const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

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
  type Book {
    title: String!
    author: String!
    published: String!
    genre: String!
  }

  type Author {
    name: String!
    born: String!
    bookcount: Int!
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
      genre: [String!]
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
    allBooks: () => books,
    findBook: (root, { title }) => books.find(book => book.title === title),
    allAuthors: () => authors,
    findAuthor: (root, { name }) => authors.find(author => author.name === name)
  },

  Mutation: {
    addBook: (root, args) => {
      const book = { ...args };
      books.push(book);
      return book;
    },
    addAuthor: (root, args) => {
      const author = { ...args };
      authors.push(author);
      return author;
    },
	editAuthor: (root, args) => {
	  const { name, newBorn } = args;
	  const author = authors.find(author => author.name === name);

	  if (!author) {
	    return null; // Author not found
	  }

	  const updatedAuthor = { ...author, born: newBorn };
	  authors = authors.map(a => a.name === name ? updatedAuthor : a);

	  return updatedAuthor;
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
