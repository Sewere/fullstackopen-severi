const Person = ({ note }) => {
    return (
      <li key={note.name}>{note.name} - {note.number}</li>
    )
  }
  
  export default Person