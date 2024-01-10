import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleVote = () => {
    const voteCopy = [...votes];
    voteCopy[selected] += 1;
    setVotes(voteCopy);
  }

  const getRandomAnecdote = () => {
    const randomNumber = Math.floor(Math.random()*anecdotes.length);
    setSelected(randomNumber);
  }

  const mostVotedDote = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <div>
        <h2>Anecday!</h2>
        <p>{anecdotes[selected]}</p>
        <p>Has been voted {votes[selected]} times</p>
        <button onClick={handleVote}>Vote!</button>
        <button onClick={getRandomAnecdote}>Next Dote</button>
      </div>
      <div>
        <h2>Anecdote with the most votes</h2>
        {votes[mostVotedDote] === 0 ? (
          <p>No dotes voted as of yet</p>
        ) : (
          <>
            <p>{anecdotes[mostVotedDote]}</p>
            <p>Has been voted {votes[mostVotedDote]} times, making it the victor!</p>
          </>
        )}
      </div>
    </div>
  )
}

export default App