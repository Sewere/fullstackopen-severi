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
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [avgList, setAvgList] = useState([])
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setAll(all +1)
    setAvgList([...avgList, 1])
    refreshStats([...avgList, 1], good, all + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral +1)
    setAll(all +1)
    setAvgList([...avgList, 0])
    refreshStats([...avgList, 0], good, all + 1)
  }
  const handleBad = () => {
    setBad(bad +1)
    setAll(all +1)
    setAvgList([...avgList, -1])
    refreshStats([...avgList, -1], good, all + 1)
  }

  const refreshStats = (newList, goodCount, allCount) => {
    const sum = newList.reduce((acc, cur) => acc + cur, 0);
    const avg = sum / newList.length || 0;
    setAverage(avg);
    const posPercentage = (goodCount / allCount) * 100 || 0;
    setPositive(posPercentage);
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="Good" handleClick={handleGood}/><Button text="Neutral" handleClick={handleNeutral}/><Button text="Bad" handleClick={handleBad}/>
      <h1>Statistics</h1>
      <Display value={"Good: "+good}/><Display value={"Neutral: "+neutral}/><Display value={"Bad: "+bad}/>
      <Display value={"All: "+all}/>
      <Display value={"Average: "+average}/>
      <Display value={"Positive: "+positive} />
    </div>
  )
}

export default App