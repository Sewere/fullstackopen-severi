const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'
  console.log("nootti",note)
  return (
    <li className='note'>
      {note.name.common} - {note.name.official}
    </li>
  )
}

export default Note