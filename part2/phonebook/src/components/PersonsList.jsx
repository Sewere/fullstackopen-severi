import React from 'react'
import Note from './Person'

const PersonsList = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Note key={person.name} note={person} />
      ))}
    </ul>
  )
}

export default PersonsList