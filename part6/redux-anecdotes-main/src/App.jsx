//import React, { useState } from 'react'
//import { useSelector, useDispatch } from 'react-redux'
//import { createStore } from 'redux'
//import { voteAnecdote, addAnecdote } from './reducers/anecdoteReducer'
import AddAnecdoteForm from './components/AddAnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'

//const store = createStore(reducer)

const App = () => {
  //const anecdotes = useSelector(state => state.anecdotes)
  //const dispatch = useDispatch()

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