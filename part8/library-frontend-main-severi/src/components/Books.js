import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [books, setBooks] = useState([])
  const result = useQuery(ALL_BOOKS)
  const [filteredBooks, setFilteredBooks] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  useEffect(() => {
    if (selectedGenre) {
      const filtered = books.filter(book =>
        book.genres.includes(selectedGenre)
      )
      setFilteredBooks(filtered)
    } else {
      setFilteredBooks(books)
    }
  }, [selectedGenre, books])

  if (!show || result.loading) {
    return null
  }

  const genres = books.reduce((acc, book) => {
    // Check if book and genres property exist and is an array
    if (book && Array.isArray(book.genres)) {
      book.genres.forEach(genre => {
        if (!acc.includes(genre)) {
          acc.push(genre)
        }
      });
    } else {
      console.error('Invalid genres property:', book);
    }
    return acc;
  }, []);
  

  return (
    <div>
      <h2>Books</h2>
      <div>
        <label htmlFor="genre-select">Filter by genre:</label>
        <select id="genre-select" onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
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

export default Books
