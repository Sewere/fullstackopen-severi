import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  /*'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
*/]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

/*
const VOTE = 'VOTE'
const ADD_ANECDOTE = 'ADD_ANECDOTE'

export const voteAction = (id) => ({
  type: VOTE,
  id
})

export const addAnecdoteAction = (content) => ({
  type: ADD_ANECDOTE,
  content
})

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case VOTE:
      const id = action.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const updatedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id === id ? updatedAnecdote : anecdote
      )
    case ADD_ANECDOTE:
      const newAnecdote = {
        content: action.content,
        id: getId(),
        votes: 0
      }
      return [...state, newAnecdote]
    default:
      return state
  }
}*/

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote: (state, action) => {
      const id = action.payload
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1
      }
    },
    appendAnecdote: (state, action) => {
      console.log(action.payload)/*
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0
      })*/
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const dotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(dotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newDote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newDote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    console.log(id)
    const anecdote = await anecdoteService.getAnecdote(id)
    console.log("tääl", anecdote)
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteService.updateAnecdote(updatedAnecdote)
    //await anecdoteService.voteAnecdote(id)
    dispatch(addVote(id))
  }
}

export default anecdoteSlice.reducer