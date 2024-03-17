import { gql, useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_AUTHORS} from '../queries'


const Authors = ({ show }) => {
  const [authors, setAuthors] = useState([])
  const { loading, error, data } = useQuery(ALL_AUTHORS)

  useEffect(() => {
    if (data) {
      setAuthors(data.allAuthors)
    }
  }, [data])

  if (!show || loading) {
    return null
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Book Count</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookcount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
