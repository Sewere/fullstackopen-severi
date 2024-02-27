import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createStore } from 'redux'
import { voteAction, addAnecdoteAction } from './reducers/anecdoteReducer'
import AddAnecdoteForm from './components/AddAnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

//const store = createStore(reducer)

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('voted for: ', id)
    dispatch(voteAction(id))
  }

  return (
    <div>
    <AnecdoteList/>
    <AddAnecdoteForm/>
    </div>
  )
}

export default App