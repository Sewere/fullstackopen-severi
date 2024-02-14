import React from 'react'

const PersonForm = ({ newName, newNumber, onNameChange, onNumberChange, onAddPerson }) => {
  return (
    <form onSubmit={onAddPerson}>
      <div>
        Name: <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default PersonForm;
