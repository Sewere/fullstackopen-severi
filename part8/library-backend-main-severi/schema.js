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

  type Subscription {
    bookAdded: Book!
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
module.exports = typeDefs