import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './reducers/filterReducer'
//import anecdoteReducer from './reducers/anecdoteReducer'
import notificationsReducer from './reducers/notificationsReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    filter: filterReducer,
    //anecdotes: anecdoteReducer,
    notification: notificationsReducer,
    blog: blogReducer,
    user: userReducer
  }
})

export default store