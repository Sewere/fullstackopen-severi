import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationWithDuration } from '../reducers/notificationsReducer'
//import anecdoteService from '../services/anecdotes'

function AddAnecdoteForm() {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(createAnecdote(inputValue))
    dispatch(setNotificationWithDuration(`New anecdote "${inputValue}" added`, 5000))
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button type="submit">Add Anecdote</button>
    </form>
  )
}

export default AddAnecdoteForm
