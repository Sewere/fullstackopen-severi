import ReactDOM from 'react-dom/client'
//import { createStore, combineReducers  } from 'redux'
import { Provider } from 'react-redux'
//import { configureStore } from '@reduxjs/toolkit'
import store from './store'
import App from './App'

/*
const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer
  }})*/

  /*
const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer
})

const store = createStore(reducer)*/
console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)