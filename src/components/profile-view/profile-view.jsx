import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../loading-view/loading-view'
import { Row, Col, Container } from 'react-bootstrap'
export default function ProfileView ({ user }) {
  const [list, setList] = useState([])
  useEffect(() => {
    const accessToken = localStorage.getItem('token')
    axios.get(`https://cinema-barn.herokuapp.com/user/${user}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(res => {
      return setList(res.data)
    }).catch(function (error) {
      console.log(error)
    })
  }, [])
  console.log(list.favorite_movies)
  if (list.length === 0) return <Loading />
  return (
    <Container className=''>
      <h1 className='my-5 bg-dark text-light d-inline-block'>{list.username}'s Profile</h1>
      <div className='d-flex justify-content-center p-2 my-5'>
        <Row lg={12}>
          <Col>
            <img src='' alt='Image goes here' />
            <p>{list.username}</p>
            {
              list.favorite_movies.length === 0
                ? <p>You have no moves saved.</p>
                : list.favorite_movies.map(movie => {
                  return <h1 key={movie._id}>{movie.title}</h1>
                })
            }
          </Col>
          <Col lg={2}>
            <p className='fs-6'>{list.email}</p>
            <p className='fs-6'>{list.birthday}</p>
          </Col>
        </Row>
      </div>
    </Container>
  )
}
