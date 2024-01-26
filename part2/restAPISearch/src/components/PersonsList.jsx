import React from 'react'
import Note from './Note'

const PersonsList = ({ persons, destroyPerson }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Note key={person.name} note={person}/>
      ))}
    </ul>
  )
}

export default PersonsList