import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`

export const FIND_BOOK = gql`
  query findBookByTitle($titleToSearch: String!) {
    findBook(title: $titleToSearch) {
      title
      author
      published
    }
  }
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
  mutation createBook($title: String!, $author: String!, $published: String!) {
    addBook(
      title: $title,
      author: $author,
      published: $published
    ) {
      title
      author
      published
    }
  }
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

