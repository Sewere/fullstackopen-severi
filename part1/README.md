# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Notes to me
## ---CONCAT---
const t = [1, -1, 3]

const t2 = t.concat(5)  // creates new array

console.log(t)  // [1, -1, 3] is printed
console.log(t2) // [1, -1, 3, 5] is printed
## ---MAP---
const t = [1, 2, 3]

const m1 = t.map(value => value * 2)
console.log(m1)   // [2, 4, 6] is printed

## ---MAP AGAIN---
const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2)  
// [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ] is printed

## --- Rest? ---
const t = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t

console.log(first, second)  // 1, 2 is printed
console.log(rest)          // [3, 4, 5] is printed

# State

## Do not chnage the state directly, make copies

const [allClicks, setAll] = useState([])

When the left button is clicked, we add the letter L to the allClicks array:

const handleLeftClick = () => {
  setAll(allClicks.concat('L'))

### ei näin
const App = () => {
  // ...
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))

    console.log('left before', left)
    setLeft(left + 1)

    console.log('left after', left)
    setTotal(left + right) 
  }

  // ...
}

### vaan näin
const App = () => {
  // ...
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right) 
  }

  // ...
}

## og debugging

Old-school, print-based debugging is always a good idea. If the component

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

is not working as intended, it's useful to start printing its variables out to the console. In order to do this effectively, we must transform our function into the less compact form and receive the entire props object without destructuring it immediately:

const Button = (props) => { 
  console.log(props)  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

This will immediately reveal if, for instance, one of the attributes has been misspelled when using the component.

NB When you use console.log for debugging, don't combine objects in a Java-like fashion by using the plus operator:

console.log('props value is ' + props)

If you do that, you will end up with a rather uninformative log message:

props value is [object Object]

Instead, separate the things you want to log to the console with a comma:

console.log('props value is', props)

## debugger
You can pause the execution of your application code in the Chrome developer console's debugger, by writing the command debugger anywhere in your code.


## react buttons
In order to make the button react to a click event, we have to add an event handler to it.

Event handlers must always be a function or a reference to a function. The button will not work if the event handler is set to a variable of any other type.

//OK,not best
<button onClick={() => setValue(0)}>button</button>

## stripping
const hello = (who) => {
  const handler = () => {
    console.log('hello', who)
  }

  return handler
}

Let's eliminate the helper variables and directly return the created function:

const hello = (who) => {
  return () => {
    console.log('hello', who)
  }
}

Since our hello function is composed of a single return command, we can omit the curly braces and use the more compact syntax for arrow functions:

const hello = (who) =>
  () => {
    console.log('hello', who)
  }

Lastly, let's write all of the arrows on the same line:

const hello = (who) => () => {
  console.log('hello', who)
}

## defining components
// This is the right place to define a component
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  // Do not define components inside another component
  const Display = props => <div>{props.value}</div>

  ### right way
  const Display = props => <div>{props.value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}
