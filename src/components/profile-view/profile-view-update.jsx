import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from '../loading-view/loading-view'
import { Row, Col, Container, Button, Form, FloatingLabel, CardGroup, Card } from 'react-bootstrap'

export function ProfileUpdate ({ user, cancelChanges, randomProfile }) {
  const [remove, setRemove] = useState([])
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
  const [modal, setModal] = useState(false)
  const [movies, setMovies] = useState([])

  let removeMovie = []

  // adds a checked movie to removeMovie array for deletion
  const deleteMovies = (e) => {
    // console.log(e.target.checked)
    list.favorite_movies.forEach(movie => {
      if(e.target.value == movie._id) {
        // console.log(movie.Title + ' has got to go.')
        removeMovie.push(movie)
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const accessToken = localStorage.getItem('token')

    // deletes movies stored in removeMoves array
    if (removeMovie.length != 0) {
      removeMovie.map(movie => {
        console.log(movie.Title)
        console.log(username)
        axios.post(`https://cinema-barn.herokuapp.com/users/mymovies/delete`, {
          Username: list.username,
          Title: movie.Title
        }, { headers: { Authorization: `Bearer ${accessToken}` } })
          .then(res => {
            //TODO -- reload updated user movie favorite list
            const data = res.data
            console.log(data) // so and so was deleted
          }).catch(e => {
            console.log(e)
          })
      })
      // TODO -- remove return
      return console.log(removeMovie)
    }

    // Error check
    if (!username || username.length == 0 && password || password.length == 0 && email || email.length == 0 && birthday || birthday.length == 0) {
      return setError({
        username: true,
        password: true,
        email: true,
        birthday: true
      }
      )
    }

    axios.put(`https://cinema-barn.herokuapp.com/users/${user}`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
      favoriteMovies: favorite_movies
    }, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(res => {
        const data = res.data
        setUpdate(false)
        setList(
          {
            username: data.username,
            password: data.password,
            email: data.email,
            birthday: data.birthday,
            favorite_movies: data.favorite_movies
          }
        )
      }).catch(e => {
        console.log(e)
      })
  }

  // GET USER DATA ON LOAD MONGO DB
  useEffect(() => {
    const accessToken = localStorage.getItem('token')
    axios.get(`https://cinema-barn.herokuapp.com/user/${user}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(res => {
      setList(res.data)
    }).catch(function (error) {
      console.log(error)
    })
  }, [])

  if (list.length === 0) return <Loading />
  return (
    <Container>
      <h1 className='my-5 bg-dark text-light d-inline-block'>{list.username}'s Profile</h1>
      <Row className='my-5'>
        <Col lg={4} className='d-flex justify-content-lg-between w-100'>
          <Form.Control className='mx-5 w-25' type='submit' value='submit' onClick={handleSubmit} />
          <Form.Control className='mx-5 w-25' type='submit' value='cancel' onClick={cancelChanges()} />
        </Col>
      </Row>
      <div className='d-flex justify-content-center p-2 my-5'>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col col={4}>
              <img src={randomProfile.picture} alt='Image goes here' />
              <Form.Group>
                {error.username ? <Form.Label className='text-danger'>Please enter a username</Form.Label> : <Form.Label> </Form.Label>}
                <FloatingLabel label={user} controlId='Username'>
                  <Form.Control placeholder={user} type='text' value={username} onChange={e => setUsername(e.target.value)} />
                </FloatingLabel>
                {error.password ? <Form.Label className='text-danger'>Please enter a password</Form.Label> : <Form.Label> </Form.Label>}
                <FloatingLabel label='Password' controlId='Password'>
                  <Form.Control placeholder='Password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col lg={4}>
              <CardGroup>
                {
                  list.favorite_movies.length === 0
                    ? <Container>
                      <p>No movies to show 🤦 </p>
                      {/* <Button className='btn bg-dark' onClick={()=>getAllMovies()} data-bs-toggle="modal" data-bs-target="#exampleModal" >Add a movie!</Button> */}
                    </Container>
                      : list.favorite_movies.map(movie => {
                      return (
                        <Card key={movie._id} className='m-3 p-2'>
                          <Form.Label className="btn btn-secondary" htmlFor='delete'>
                            <Card.Img src={movie.ImagePath} />
                          </Form.Label>
                          <Card.Title>{movie.Title}</Card.Title>
                          <Form.Check id='delete' label='Delete' value={movie._id} onChange={(e) => { deleteMovies(e) }} />
                        </Card>
                      )
                    })
                }
              </CardGroup>
              {/* <Button className='btn bg-dark' onClick={()=>getAllMovies()} data-bs-toggle="modal" data-bs-target="#exampleModal" >Add a movie!</Button> */}
            </Col>
            <Col lg={4}>
              {error.email ? <Form.Label className='text-danger'>Please enter a email</Form.Label> : <Form.Label> </Form.Label>}
              <Form.Group>
                <FloatingLabel label={list.email} controlId='Email'>
                  <Form.Control type='text' value={email} onChange={e => setEmail(e.target.value)} />
                </FloatingLabel>
              </Form.Group>
              {error.birthday ? <Form.Label className='text-danger'>Please enter a birthday</Form.Label> : <Form.Label> </Form.Label>}
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
  );
};
