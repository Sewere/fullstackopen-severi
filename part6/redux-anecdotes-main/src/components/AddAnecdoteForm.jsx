import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationsReducer'

function AddAnecdoteForm() {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addAnecdote(inputValue))
    dispatch(setNotification(`New anecdote "${inputValue}" added`))
    setInputValue('')
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
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
