import React, { useState } from 'react'

export function LoginView (props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(username, password)
    // send request to server for auth
    // then call props.onLoggedIn(username)

    props.onLoggedIn(username)
  }

  return (
    <form>
      <label>
        <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type='submit' onClick={handleSubmit}>Submit</button>
    </form>
  )
}
