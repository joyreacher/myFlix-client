import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './login-view.scss'
export function LoginView (props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(
      'This is the username: %c' + username + '%c and password: %c' + password + '. %c',
      'font-size: 1.3rem; color: #fff; background: #1e90ff; padding: 4px',
      '',
      'font-size: 1.3rem; color: #f00; font-weight: bold',
      ''
    )
    // send request to server for auth
    // then call props.onLoggedIn(username)

    props.onLoggedIn(username)
  }

  return (
    <div className='login__container'>
      <form className='login__form'>
        <h1>Sign in</h1>
        <label>
          <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type='submit' onClick={handleSubmit}>Submit</button>
        <a onClick={() => props.onRegisterClick()}>Register</a>
      </form>
    </div>
  )
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired
}
