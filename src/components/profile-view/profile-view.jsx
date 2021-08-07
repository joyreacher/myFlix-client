import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
export default function ProfileView ({ user }) {
  const [list, setList] = useState([])
  useEffect(() => {
    const accessToken = localStorage.getItem('token')
    axios.get(`https://cinema-barn.herokuapp.com/user/${user}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(res => {
      console.log(res.data)
      setList(res.data)
      return list
    }).catch(function (error) {
      console.log(error)
    })
  }, [])
  return (
    <Container>
      <h1>{list.username}</h1>
    </Container>
  )
}
