import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { FIND_USER, ALL_BOOKS } from '../queries'

const FavoriteGenre = ({ username }) => {
    console.log(username)
    const { loading: userLoading, error: userError, data: userData } = useQuery(FIND_USER, {
        variables: { nameToSearch: username }
      })
  const { loading: booksLoading, error: booksError, data: booksData } = useQuery(ALL_BOOKS)
  if (userLoading || booksLoading) return <p>Loading...</p>
  if (userError || booksError) {
    return <p>Error...</p>
  }
  const userFavoriteGenre = userData.findUser.favoriteGenre
  console.log(userData.findUser.favoriteGenre)
  const books = booksData.allBooks

  const filteredBooks = books.filter(book => book.genres.includes(userFavoriteGenre))

  return (
    <div>
      <h2>{username} favorite genre is {userFavoriteGenre}</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FavoriteGenre
