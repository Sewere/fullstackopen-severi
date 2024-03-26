const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const User = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const { GraphQLError } = require('graphql')
const { v1: uuid } = require('uuid')
const  DataLoader  = require('dataloader')

const batchBookCounts = async (authorNames) => {
  const bookCounts = {}
  const validAuthorNames = []
  // Filter out unique valid author names
  authorNames.forEach(authorName => {
    if (!bookCounts[authorName]) {
      bookCounts[authorName] = 0
      validAuthorNames.push(authorName)
    }
  })

  const authors = await Author.find({ name: { $in: validAuthorNames } })

  // Aggregate book counts for each author
  const books = await Book.find({ author: { $in: authors.map(author => author._id) } });
  books.forEach(book => {
    const authorName = book.author.name;
    if (bookCounts[authorName] !== undefined) {
      bookCounts[authorName]++;
    }
  });

  // Return book counts array in the order of author names
  return authorNames.map(authorName => bookCounts[authorName]);
};

const authorLoader = new DataLoader(keys => batchBookCounts(keys), { cache: false })


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
        const allAuthors = await Author.find({});
  
        const authorNames = allAuthors.map(author => author.name)
  
        // Fetch book counts for all authors in a single batch request
        const bookCounts = await authorLoader.loadMany(authorNames);
  
        // Merge book counts with authors
        const authorsWithBookCounts = allAuthors.map((author, index) => ({
          ...author.toObject(),
          bookCount: bookCounts[index] // Add book count to each author
        }));
  
        return authorsWithBookCounts;
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
        if (!context) {
          throw new GraphQLError('Authentication required');
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
        console.log("Made a book:", book)
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book.save()
      },
      addAuthor: (root, args) => {
        if (!context.token) {
          throw new GraphQLError('Authentication required');
        }
        const author = new Author({ ...args })
        //authors.push(author)
        return author.save()
      },
      editAuthor: async (root, args, context) => {
        if (!context.token) {
          throw new GraphQLError('Authentication required');
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
        console.log("INSIDE LOGIN NOW")
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
        console.log("SLAISISLSUUUS",jwt.sign(userForToken, process.env.JWT_SECRET))
        return {
          value: jwt.sign(userForToken, process.env.JWT_SECRET)
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
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
    }
}
module.exports = resolvers