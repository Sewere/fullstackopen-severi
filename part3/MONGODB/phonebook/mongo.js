const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://severipalikko:${password}@clustersimppy.v1dgsk0.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// Fetch all persons and show them
if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('Phonebook entries:')
    result.forEach(person => {
      console.log(`${person.name} - ${person.number}`)
    })
    mongoose.connection.close();
  })
  //missing phone number
} else if (process.argv.length === 4) {
  console.log('Provide a name and number!')
  mongoose.connection.close()
  process.exit(1)

  // Add new person to db using the first parameter as name and second as number
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({
    name,
    number,
  })
  person.save().then(result => {
    console.log(`Added a new person: ${result.name} - ${result.number}`)
    mongoose.connection.close()
  })
  //womp-womp
} else {
  console.log('Something went awry.')
  mongoose.connection.close()
}
