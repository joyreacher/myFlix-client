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
        
      </label>
    </form>
  )
}
