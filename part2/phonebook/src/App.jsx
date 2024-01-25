import { useState, useEffect } from 'react'
import Person from './components/Person'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'
import axios from 'axios'
import personService from './services/notes'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPeeps, setSearchPeeps] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personExists = persons.find(person => person.name === newName)
    if (!personExists) {
      const personObject = {
        name: newName,
        id: newName,
        number: newNumber
      }
      personService
      .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    } else {
      const updateNro = window.confirm(`The name ${newName} already exists. Do you want to update its number?`)
      if(updateNro){
        const changedPerson = { ...personExists, number:newNumber}
        console.log("OI", changedPerson)
        personService
        .update(changedPerson.id, changedPerson)
        .then((returnedPerson) => {
          setPersons(persons.map((person) => (person.id !== changedPerson.id ? person : returnedPerson)));
        })
        .catch((error) => {
          alert(`SOMETHING WENT WRONG`);
        })
      }
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchPeeps(event.target.value)
  }

  const filteredPersons = persons.filter((person) =>
  person.name && person.name.toLowerCase().includes(searchPeeps.toLowerCase())
  )

  const clearSearch = () => {
    setSearchTerm('')
  }

  const destroyPerson = id => {
    const confirmed = window.confirm(`Are you sure you want to delete ${id}?`)
    if(confirmed){
      console.log(`Destroying person with id ${id}`)
      personService
        .destroyPerson(id)
          .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(
            `WHat HAppEnEd?`
          )
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter
        searchTerm={searchPeeps}
        onSearchChange={handleSearchChange}
        onClearSearch={clearSearch}
      />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onAddPerson={addPerson}
      />
      <h2>Numbers</h2>
      <PersonsList persons={filteredPersons} destroyPerson={destroyPerson} />
    </div>
  )
}

export default App
