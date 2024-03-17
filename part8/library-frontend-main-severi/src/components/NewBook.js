import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_BOOKS, CREATE_BOOK, ALL_AUTHORS } from '../queries'

const NewBook = ({ show, setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setError(messages)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    try {
      await createBook({
        variables: { title, author, published, genres }
      })

      // Reset form fields after successful submission
      setTitle('')
      setAuthor('')
      setPublished('')
      setGenres([])
      setGenre('')
    } catch (error) {
      console.error('Error adding book:', error)
      // Handle error
    }
  }

  const addGenre = () => {
    if (genre.trim()) {
      setGenres([...genres, genre.trim()])
      setGenre('')
    }
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={submit}>
        <div>
          Title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </div>
        <div>
          Author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            required
          />
        </div>
        <div>
          Published
          <input
            value={published}
            onChange={({ target }) => setPublished(target.value)}
            required
          />
        </div>
        <div>
          Genre
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            Add Genre
          </button>
        </div>
        <div>Genres: {genres.join(', ')}</div>
        <button type="submit">Create Book</button>
      </form>
    </div>
  )
}

export default NewBook
