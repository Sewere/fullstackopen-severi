
import React from 'react'

const SearchFilter = ({ searchTerm, onSearchChange, onClearSearch }) => {
  return (
    <div>
      Search: <input value={searchTerm} onChange={onSearchChange} />
      <button onClick={onClearSearch}>Clear</button>
    </div>
  )
}

export default SearchFilter
