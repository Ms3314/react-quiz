import React from 'react'

export default function Start({noOfQns}) {
  return (
    <div className='start'>
      <h2>Welcome to the React Quiz!</h2>
      <h3>{noOfQns} question to test your React mastery </h3>
      <button className='btn btn-ui'>Lets start</button>
    </div>
  )
}
