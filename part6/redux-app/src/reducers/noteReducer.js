const noteReducer = (state = [], action) => {
    switch(action.type) {
      case 'NEW_NOTE':
        return state.concat(action.payload)
      case 'TOGGLE_IMPORTANCE': {
        const id = action.payload.id
        const noteToChange = state.find(n => n.id === id)
        const changedNote = { 
          ...noteToChange, 
          important: !noteToChange.important 
        }
        return state.map(note =>
          note.id !== id ? note : changedNote 
        )
       }
      default:
        return state
    }
    // store.dispatch(createNote(content))
const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  }
}

const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id }
  }
}
  }