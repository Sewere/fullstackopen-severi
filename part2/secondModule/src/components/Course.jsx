const Course = ({ course }) => {
  console.log('hey!', course)
  //const { course } = props
    return (
      <div>
        <h1>{course.name}</h1>
        <ul>
        {course.parts.map(note => <li key={note.id}>{note.name}  {note.exercises}</li>)}
        </ul>
      </div>
    )
  }
  
  export default Course