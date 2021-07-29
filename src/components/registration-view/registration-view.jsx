import React, { useState } from 'react'
import './registration-view.scss'

export function RegistrationView (props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(username, password, email, birthday)

    /**
      CREATES USER AND SET REGISTRATION TO FALSE
      on real app --once user registers redirect them back to login page
      for now redirect to movie list
     */
    props.onLoggedIn(username)
  }

  return (
    <div className='registration__container'>
      <form className='registration__form'>
        <h1>Register</h1>
        <label htmlFor='Username'>
          <input placeholder='Username' type='text' onChange={e => { setUsername(e.target.value) }} />
        </label>
        <label htmlFor='Password'>
          <input placeholder='Password' type='password' onChange={e => { setPassword(e.target.value) }} />
        </label>
        <label htmlFor='Email'>
          <input placeholder='Email' type='email' onChange={e => { setEmail(e.target.value) }} />
        </label>
        <label htmlFor='DOB'>
          <input placeholder='Birthday' type='date' onChange={e => { setBirthday(e.target.value) }} />
        </label>
        <button type='submit' onClick={handleSubmit}>Register</button>
      </form>
    </div>
  )
}
