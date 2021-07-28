import React, { useState } from 'react'

export function LoginView () {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleSubmit = () => {
    e.preventDefault()
    console.log(username, password)
  }

  return (
    <form>
      <label>
        <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
      </label>
    </form>
  )
}
