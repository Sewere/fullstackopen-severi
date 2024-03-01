import PropTypes from 'prop-types'

const AnecdoteForm = ({addAnecdote}) => {

  const onCreate = (event) => {
    //event.preventDefault()
    //const content = event.target.anecdote.value
    //event.target.anecdote.value = ''
    //console.log('new anecdote', content)
    addAnecdote(event)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

AnecdoteForm.propTypes = {
  addAnecdote: PropTypes.func.isRequired
}

export default AnecdoteForm
