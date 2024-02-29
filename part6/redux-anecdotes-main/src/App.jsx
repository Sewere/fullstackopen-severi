import { useEffect } from 'react'
//import { useSelector, useDispatch } from 'react-redux'
//import { createStore } from 'redux'
//import { voteAnecdote, addAnecdote } from './reducers/anecdoteReducer'
import AddAnecdoteForm from './components/AddAnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'
//import anecdoteService from './services/anecdotes'
import { initializeAnecdotes  } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

//const store = createStore(reducer)

const App = () => {
  //const anecdotes = useSelector(state => state.anecdotes)
  //const dispatch = useDispatch()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  return (
    <div>
    <Notification />
    <VisibilityFilter/>
    <AnecdoteList/>
    <AddAnecdoteForm/>
    </div>
  )
}

export default App