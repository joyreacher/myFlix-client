import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from '../loading-view/loading-view'
import { Row, Col, Container, Button, Form, FloatingLabel, CardGroup, Card } from 'react-bootstrap'

export function ProfileUpdate ({ user, cancelChanges}) {
  console.log(cancelChanges)
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

  // const cancelChanges = () => {
  //   setUpdate(false)
  // }
  // const updateInformation = (e) => {
  //   setUpdate(true)
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username || username.length == 0 && password || password.length == 0 && email || email.length == 0 && birthday || birthday.length == 0) {
      return setError({
        username: true,
        password: true,
        email: true,
        birthday: true
      }
      )
    }
    const accessToken = localStorage.getItem('token')
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

  // GET USER DATA ON LOAD INCLUDING PICTURE
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
              <img src={profile.picture} alt='Image goes here' />
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
                      <p>Bummer, you have no moves saved.</p>
                      {/* <Button className='btn bg-dark' onClick={()=>getAllMovies()} data-bs-toggle="modal" data-bs-target="#exampleModal" >Add a movie!</Button> */}
                    </Container>
                      : list.favorite_movies.map(movie => {
                      return (
                        <Card key={movie._id} className='m-3'>
                          <label className="btn btn-secondary" for="delete" >
                            <Card.Img src={movie.ImagePath} />
                          </label>
                          <Card.Title>{movie.Title}</Card.Title>
                          {/* <Link to={`/movies/${movie._id}`}>
                            <Button>Delete</Button>
                          </Link> */}
                          <input type="radio" className="btn-check" name="delete" id="delete" autoComplete="off" checked onChange={() => {console.log('delete')}} />
                          <label className="btn btn-secondary" for="option1">Delete</label>
                          <input type="radio" className="btn-check" name="options" id="option2" autoComplete="off" />
                          <label className="btn btn-secondary" for="option2">Radio</label>
                        </Card>
                      )
                    })
                }
              </CardGroup>
              <Button className='btn bg-dark' onClick={()=>getAllMovies()} data-bs-toggle="modal" data-bs-target="#exampleModal" >Add a movie!</Button>
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
