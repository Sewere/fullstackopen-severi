import React from 'react'
import Person from './Person'

const PersonsList = ({ persons, destroyPerson }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person key={person.name} note={person}  destroyPerson={() => destroyPerson(person.id)}/>
      ))}
    </ul>
  )
}

export default PersonsList