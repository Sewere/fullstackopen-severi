import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    dispatch(filterChange(event.target.value))
  }

  return (
    <div>
      <h3>Filter anecdotes</h3>
      <input
        type="text"
        onChange={handleFilterChange}
        placeholder="Type something"
      />
    </div>
  )
}

export default VisibilityFilter