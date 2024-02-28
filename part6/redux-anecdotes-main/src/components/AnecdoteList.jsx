import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationsReducer'

function AnecdoteList() {
  const anecdotes = useSelector(state => {
    if (state.filter === 'ALL') {
      return state.anecdotes
    } else {
      return state.anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
    }
  })

  const dispatch = useDispatch()

  const vote = (id, content) => {
    console.log("Voted for: ", id)
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`Voted for "${content}"`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

 const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            Has votes: {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>Vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
