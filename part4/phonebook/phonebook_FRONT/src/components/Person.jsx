const Person = ({ note: person, destroyPerson }) => {
    return (
      <li key={person.name}>{person.name} - {person.number}  <button margin='20' onClick={destroyPerson}></button></li>
    )
  }
  
  export default Person