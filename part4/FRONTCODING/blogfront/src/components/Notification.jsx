const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    const isError = message.toLowerCase().includes('!')
  
    return (
      <div className={isError ? 'error' : 'non-error'}>
        {message}
      </div>
    )
  }
  
  export default Notification