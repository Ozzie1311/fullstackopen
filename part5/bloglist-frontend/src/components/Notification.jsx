import React from 'react'

const Notification = ({ message }) => {
  return (
    <div className={message.startsWith('w') ? 'error' : 'success'}>
      {message}
    </div>
  )
}

export default Notification
