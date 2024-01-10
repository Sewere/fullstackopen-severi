import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = props => <div>{props.value}</div>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral +1)
  }
  const handleBad = () => {
    setBad(bad +1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="Good" handleClick={handleGood}/><Button text="Neutral" handleClick={handleNeutral}/><Button text="Bad" handleClick={handleBad}/>
      <h1>Statistics</h1>
      <Display value={"Good: "+good}/><Display value={"Neutral: "+neutral}/><Display value={"Bad: "+bad}/>
    </div>
  )
}

export default App