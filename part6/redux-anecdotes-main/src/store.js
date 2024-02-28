import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './reducers/filterReducer'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationsReducer from './reducers/notificationsReducer'

const store = configureStore({
  reducer: {
    filter: filterReducer,
    anecdotes: anecdoteReducer,
    notification: notificationsReducer
  }
})

export default store