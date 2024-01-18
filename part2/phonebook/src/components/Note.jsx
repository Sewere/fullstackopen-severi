const Note = ({ note }) => {
    console.log('oi', note)
    return (
      <li key={note.name}>{note.name} {note.number}</li>
    )
  }
  
  export default Note