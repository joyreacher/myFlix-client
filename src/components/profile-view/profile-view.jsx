import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
  const [error, setError] = useState({
    username: false,
    password: false,
    email: false,
    birthday: false
  })

  const cancelChanges = () => {
    setUpdate(false)
  }
  const updateInformation = (e) => {
    setUpdate(true)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username || username.length == 0) {
      return setError({username: true})
    }
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
        setList({email: data.email})
      }).catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('token')
    axios.get(`https://cinema-barn.herokuapp.com/user/${user}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(res => {
      // setUsername(res.data.username)
      // setFavorite_movies(res.data.favorite_movies)
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

  console.log(list)
  if (list.length === 0) return <Loading />
  if (update) return (
    <Container>
      <h1 className='my-5 bg-dark text-light d-inline-block'>{list.username}'s Profile</h1>
      <Row className='my-5'>
        <Col lg={4} className='d-flex justify-content-lg-between w-100'>
          <Form.Control className='mx-5 w-25' type='submit' value='submit' onClick={handleSubmit} />
          <Form.Control className='mx-5 w-25' type='submit' value='cancel' onClick={() => cancelChanges()} />
        </Col>
      </Row>
      <div className='d-flex justify-content-center p-2 my-5'>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col col={4}>
              <img src={profile.picture} alt='Image goes here' />
              <Form.Group>
                {error.username ? <Form.Label className='text-danger'>Please enter a username</Form.Label> : <Form.Label> </Form.Label>}
                <FloatingLabel label={user} controlId='Username'>
                  <Form.Control placeholder={user} type='text' value={username} onChange={e => setUsername(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel label='Password' controlId='Password'>
                  <Form.Control placeholder='Password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col lg={4}>
              <CardGroup>
                {
                  list.favorite_movies.length === 0
                    ? <p>You have no moves saved.</p>
                    : list.favorite_movies.map(movie => {
                      return (
                        <Card key={movie._id} className='m-3'>
                          <Card.Img src={movie.ImagePath} />
                          <Card.Title>{movie.Title}</Card.Title>
                          <Link to={`/movies/${movie._id}`}>
                            <Button>Delete</Button>
                          </Link>
                        </Card>
                      )
                    })
                }
              </CardGroup>
            </Col>
            <Col lg={4}>
              <Form.Group>
                <FloatingLabel label={list.email} controlId='Email'>
                  <Form.Control type='text' value={email} onChange={e => setEmail(e.target.value)} />
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
                <FloatingLabel label={list.birthday} controlId='floatingInput'>
                  <Form.Control type='date' value={birthday} onChange={e => { setBirthday(e.target.value) }} />
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  )
  return (
    <Container className=''>
      <h1 className='my-5 bg-dark text-light d-inline-block'>{list.username}'s Profile</h1>
      <Row className='my-5'>
        <Col lg={8} className='d-flex justify-content-lg-between w-100'>
          <Form.Control className='mx-5 w-25' type='submit' value='update profile' onClick={() => updateInformation()} />
          {/*//  TODO: add a function to add fav movie to fav movie array */}
          <Form.Control className='mx-5 w-25' type='submit' value='Add a favorite movie' onClick={() => updateInformation()} />
        </Col>
      </Row>
      <div className='d-flex justify-content-center p-2 my-5'>
        <Row>
          <Col lg={4}>
            <img src={profile.picture} alt='Image goes here' />
            <p>{username}</p>
          </Col>
          <Col lg={4}>
            <CardGroup>
              {
                list.favorite_movies.length === 0
                  ? <p>You have no moves saved.</p>
                  : list.favorite_movies.map(movie => {
                    return (
                      <Card key={movie._id} className='m-3'>
                        <Card.Img src={movie.ImagePath} alt='no image available' />
                        <Card.Title>{movie.Title}</Card.Title>
                        <Link to={`/movies/${movie._id}`}>
                          <Card.Text>Details</Card.Text>
                        </Link>
                      </Card>
                    )
                  })
              }
            </CardGroup>
          </Col>
          <Col lg={4}>
            <p className='fs-6'>{list.email}</p>
            <p className='fs-6'>{list.birthday}</p>
          </Col>
        </Row>
      </div>
    </Container>
  )
}
