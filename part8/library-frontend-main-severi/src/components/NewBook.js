import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_BOOKS, CREATE_BOOK, FIND_AUTHOR, CREATE_AUTHOR, ALL_AUTHORS } from '../queries'

const NewBook = ({ show, setError }) => {
  const [title, setTitle] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [author, setAuthor] = useState('');

  /*
  const { loading, data, error, refetch} = useQuery(FIND_AUTHOR, {
    variables: { authorName },
    refetchOnWindowFocus: false,
    skip: !authorName,
    enabled: false
  })*/

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setError(messages)
    }
  })/*
  const [createAuthor] = useMutation(CREATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setError(messages)
    }
  })*/

  const submit = async (event) => {
    event.preventDefault()
    console.log("LEGOO")
    try {
      /*
      let author;
      refetch()
      const newAuthor = await createAuthor({
        variables: {
          name: authorName,
          born: authorBorn,
          bookcount: authorBookCount
        }
      })
      author = newAuthor.data.addAuthor;
      console.log(author)
      console.log(newAuthor)*/
      await createBook({
        variables: {
          title,
          author: author,
          published,
          genres
        }
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
          Author Name
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
  );
};

export default NewBook
