import { createContext, useContext, useReducer } from 'react'

const initialState = {
    message: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { ...state, message: action.payload }
    case 'CLEAR_NOTIFICATION':
      return { ...state, message: null }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) {
      throw new Error('useNotification must be used within a NotificationProvider')
    }
    return context
  }

export default NotificationContext