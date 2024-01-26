import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import SearchFilter from './components/SearchFilter'
import PersonsList from './components/PersonsList'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [search, setSearch] = useState('')
  const [queryError, setQueryError] = useState(false)
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)


  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const filtered = notes.filter(
      note =>
        note.name.common &&
        note.name.common.toLowerCase().includes(search.toLowerCase())
    )
    if (filtered.length === 1) {
      setSelectedCountry(filtered[0])
    } else {
      setSelectedCountry(null)
    }
    setFilteredCountries(filtered)
    setQueryError(filtered.length > 10)
  }, [search, notes]);

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
  
    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
        .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleSearchChange = (event) => {
    setQueryError(false)
    setSelectedCountry(null)
    setSearch(event.target.value)
  }

  /*
  const filteredCountries = notes.filter((note) =>
  note.name.common && note.name.common.toLowerCase().includes(search.toLowerCase())
  )*/

  const clearSearch = () => {
    setSearch('')
    setSelectedCountry(null)
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <SearchFilter
        searchTerm={search}
        onSearchChange={handleSearchChange}
        onClearSearch={clearSearch}
      />
      {filteredCountries.length > 10 ? (
        <p>Please make your query more specific.</p>
      ) : filteredCountries.length === 1 ? (
        <CountryDetails country={selectedCountry} />
      ) : filteredCountries.length > 0 ? (
        <PersonsList persons={filteredCountries} />
      ) : (
        <p>No matching countries found.</p>
      )}
      <form onSubmit={addNote}>
      <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App