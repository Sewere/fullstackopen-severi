import { gql } from '@apollo/client'

export const FIND_BOOK = gql`
  query findBookByTitle($titleToSearch: String!) {
    findBook(title: $titleToSearch) {
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`

export const FIND_USER = gql`
  query findUserByName($nameToSearch: String!) {
    findUser(username: $nameToSearch) {
      username
      favoriteGenre
    }
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    id
    author {
      name
    }
  }
`

export const ALL_BOOKS = gql`
query {
  allBooks {
   ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookcount
    }
  }
`

export const FIND_AUTHOR = gql`
  query findAuthorByName($nameToSearch: String!) {
    findAuthor(name: $nameToSearch) {
      name
      born
      bookcount
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      ...BookDetails
    }
  }${BOOK_DETAILS}
`

export const CREATE_AUTHOR = gql`
  mutation createAuthor($name: String!, $born: String!, $bookcount: Int!) {
    addAuthor(
      name: $name,
      born: $born,
      bookcount: $bookcount
    ) {
      name
      born
      bookcount
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $newBorn: String!) {
    editAuthor(name: $name, newBorn: $newBorn) {
      name
      born
      bookcount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!, $favoriteGenre: String!) {
    createUser(username: $username, password: $password, favoriteGenre: $favoriteGenre) {
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
