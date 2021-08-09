import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../loading-view/loading-view'
import { Row, Col, Container, Button, Form, FloatingLabel, CardGroup, Card } from 'react-bootstrap'

export default function ProfileView ({ user, onLoggedIn }) {
  console.log(onLoggedIn)
  const [list, setList] = useState([])
  const [update, setUpdate] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [birthday, setBirthday] = useState('')
  const [favoriteMovies, setFavorite_movies] = useState({})
  const [profile, setProfile] = useState([])
  const [email, setEmail] = useState('')

  const cancelChanges = () => {
    setUpdate(false)
  }
  const updateInformation = (e) => {
    setUpdate(true)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const accessToken = localStorage.getItem('token')
    axios.put(`https://cinema-barn.herokuapp.com/users/${user}`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(res => {
        const data = res.data
        console.log(data)
        setUpdate(false)
        setEmail(data.email)
      }).catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('token')
    axios.get(`https://cinema-barn.herokuapp.com/user/${user}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(res => {
      setFavorite_movies(user.favorite_movies)
      setList(res.data)
      return axios.get(`https://randomuser.me/api/?gender=female`)
    }).then(res => {
      console.log(res.data.results[0].picture)
      const data = res.data
      setProfile(
        {
          picture: res.data.results[0].picture.large
        }
      )
      return data
    }).catch(function (error) {
      console.log(error)
    })
  }, [])

  if (list.length === 0) return <Loading />
  if (update) return (
    <Container className=''>
      <h1 className='my-5 bg-dark text-light d-inline-block'>{list.username}'s Profile</h1>
      <div className='d-flex justify-content-center p-2 my-5'>
        <Form onSubmit={handleSubmit}>
          <Row lg={12}>
            <Col>
              <img src={profile.picture} alt='Image goes here' />
              <Form.Group>
                <FloatingLabel label={user} controlId='Username'>
                  <Form.Control placeholder={user} type='text' value={username} onChange={e => setUsername(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel label='password' controlId='Password'>
                  <Form.Control placeholder='Password' type='text' value={password} onChange={e => setPassword(e.target.value)} />
                </FloatingLabel>
              </Form.Group>
              <CardGroup>
                {
                  list.favorite_movies.length === 0
                    ? <p>You have no moves saved.</p>
                    : list.favorite_movies.map(movie => {
                      return (
                        <Card key={movie._id}>
                          <Card.Img src={movie.ImagePath} />
                          <Card.Title>{movie.Title}</Card.Title>
                        </Card>
                      )
                    })
                }
              </CardGroup>
            </Col>
          <Col lg={2}>
            <Form.Group>
              <FloatingLabel label='Email' controlId='Email'>
                <Form.Control placeholder='Email' type='text' value={email} onChange={e => setEmail(e.target.value)} />
              </FloatingLabel>
            </Form.Group>
            {/* <p className='fs-6'>{list.email}</p> */}
            <Form.Group>
              <FloatingLabel label='Birthday' controlId='floatingInput'>
                <Form.Control placeholder='Birthday' type='date' value={birthday} onChange={e => { setBirthday(e.target.value) }} />
              </FloatingLabel>
            </Form.Group>
            <Form.Control type='submit' value='submit' />
            {/* <p className='fs-6'>{list.birthday}</p> */}
          </Col>
          <Row>
            {/* <Col md={6}>
              <Button className='btn bg-dark' onClick={() => updateInformation()}>Update</Button>
            </Col> */}
            <Col md={6}>
              <Button className='btn bg-dark' onClick={() => cancelChanges()}>Cancel</Button>
            </Col>
          </Row>
        </Row>
        </Form>
      </div>
    </Container>
  )
  return (
    <Container className=''>
      <h1 className='my-5 bg-dark text-light d-inline-block'>{username}'s Profile</h1>
      <div className='d-flex justify-content-center p-2 my-5'>
        <Row lg={12}>
          <Col>
            <img src={profile.picture} alt='Image goes here' />
            <p>{username}</p>
            <CardGroup>
              {
                list.favorite_movies.length === 0
                  ? <p>You have no moves saved.</p>
                  : list.favorite_movies.map(movie => {
                    return (
                      <Card key={movie._id}>
                        <Card.Img src={movie.ImagePath} />
                        <Card.Title>{movie.Title}</Card.Title>
                      </Card>
                    )
                  })
              }
            </CardGroup>
          </Col>
          <Col lg={2}>
            <p className='fs-6'>{email}</p>
            <p className='fs-6'>{birthday}</p>
          </Col>
          <Row>
            <Form.Control type='submit' value='update' onClick={() => updateInformation()} />
            {/* <Col md={6}>
              <Button className='btn bg-dark' onClick={() => updateInformation()}>Update</Button>
            </Col> */}
            <Col md={6}>
              <Button className='btn bg-dark' onClick={() => cancelChanges()}>Cancel</Button>
            </Col>
          </Row>
        </Row>
      </div>
    </Container>
  )
}
