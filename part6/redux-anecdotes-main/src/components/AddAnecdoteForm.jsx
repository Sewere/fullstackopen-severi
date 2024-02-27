import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdoteAction } from '../reducers/anecdoteReducer'

function AddAnecdoteForm() {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addAnecdoteAction(inputValue))
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
