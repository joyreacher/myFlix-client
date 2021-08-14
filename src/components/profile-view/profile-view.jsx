import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from '../loading-view/loading-view'
import { Row, Col, Container, Button, Form, CardGroup, Card } from 'react-bootstrap'
import './profile-view.scss'
import { ProfileUpdate } from './profile-view-update'

export default function ProfileView ({ user, onLoggedIn, getMovies, username, handleUpdate }) {
  const [match, setMatch] = useState(null)
  const [list, setList] = useState([])
  const [update, setUpdate] = useState(false)
  const [profile, setProfile] = useState([])
  const [modal, setModal] = useState(false)
  const [movies, setMovies] = useState([])
  const [favorites, setFavorites] = useState([])
  const [sub, setSub] = useState('')
  const [error, setError] = useState({
    add: ' '
  })

  const deleteUser = (e) => {
    e.preventDefault()
    alert('are you sure you want to delete your profile?')
    const accessToken = localStorage.getItem('token')
    axios.post(`https://cinema-barn.herokuapp.com/users/unregister`, {
      Username: list.username,
      Email: list.email
    }, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(res => {
      const data = res.data
      console.log(data)
      handleUpdate()
    })
      .catch(e => {
        console.log(e)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const accessToken = localStorage.getItem('token')
    // console.log(favorites.title)
    return axios.post(`https://cinema-barn.herokuapp.com/users/mymovies/add`, {
      Username: list.username,
      Title: favorites.title
    }, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(res => {
      setSub(null)
      const data = res.data
      console.log(data)
    })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect((e) => {
    if (match !== null) {
      const input = document.querySelector('input[match="true"')
      input.insertAdjacentHTML('afterend', "<span style='color:red'>This movie is in your favorites 86</span>")
    }
  }, [match])

  const addMovies = (e) => {
    if (e.target.checked) {
      const result = movies.find(({ _id }) => _id === e.target.value)
      if (!result) {
        return console.log('Could not find that movie')
      }
      const matchFavs = list.favorite_movies.find(({ _id }) => _id === e.target.value)
      if (matchFavs) {
        e.target.setAttribute('match', true)
        e.target.setAttribute('disabled', 'disabled')
        console.log('there is a match')
        setMatch('This movie already exists in your favorites')
      } else {
        setSub(result)
        setFavorites(result)
      }
    }
  }

  const cancelChanges = () => {
    setUpdate(false)
  }
  const updateInformation = (e) => {
    setUpdate(true)
  }

  // GETS ALL MOVIES
  const getAllMovies = () => {
    const accessToken = localStorage.getItem('token')
    axios.get('https://cinema-barn.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(res => {
      // console.log(res.data)
      const movieData = res.data.map(item => {
        movies.push({
          _id: item._id,
          title: item.Title,
          ImgPath: item.ImagePath
        })
      })
      setModal(true)
      return movieData
    }).catch(function (error) {
      console.log(error)
    })
  }

  // GET USER DATA ON LOAD INCLUDING PICTURE
  useEffect(() => {
    const accessToken = localStorage.getItem('token')
    axios.get(`https://cinema-barn.herokuapp.com/user/${!username ? user : username}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(res => {
      setList(res.data)
      return axios.get(`https://randomuser.me/api/?results=1`)
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
  }, [update])

  if (list.length === 0) return <Loading />
  if (update) return (
    <ProfileUpdate user={user} cancelChanges={() => cancelChanges} randomProfile={profile} updateRef={update} handleUpdate={handleUpdate} />
  )
  return (
    <>
      <div className="modal" tabIndex="-1" id="exampleModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add movie to your favorites list</h5>
              <button onClick={()=> setModal(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Form onSubmit={(e) => handleSubmit(e)}>
                <CardGroup>
                  {movies.length == 0 ? '..loading' : movies.map(movie => {
                    return (
                      <Col key={movie._id} lg={6} className='p-3'>
                        <Card>
                          <Form.Label htmlFor={movie._id} className='btn btn-secondary'>
                            <Card.Img src={movie.ImgPath} className='movie__img' />
                          </Form.Label>
                          <Form.Check id={movie._id} value={movie._id} onChange={(e) => { addMovies(e) }} />
                          <Card.Title className='movie__title'>{movie.title}</Card.Title>
                        </Card>
                      </Col>
                    )
                  })}
                </CardGroup>
                <Form.Group className="modal-footer">
                  <Form.Control type="button" className="btn btn-secondary" data-bs-dismiss="modal" value='cancel' />
                  <Form.Control type="submit" className="btn btn-primary" value='Add' />
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Container>
        <h1 className='my-5 bg-dark text-light d-inline-block'>{list.username}'s Profile</h1>
        <Row className='my-5'>
          <Col lg={8} className='d-flex justify-content-lg-between w-100'>
            <Form.Control className='mx-5 w-25' type='submit' value='update profile' onClick={() => updateInformation()} />
            <Form.Control className='mx-5 w-25' type='submit' value='delete profile' onClick={(e) => deleteUser(e)} />
          </Col>
  </Row>
        <div className='d-flex justify-content-center p-2 my-5'>
          <Row>
            <Col lg={4}>
              <img src={profile.picture} alt='Image goes here' />
              <p>{list.username}</p>
            </Col>
            <Col lg={4}>
              <CardGroup>
                {
                  list.favorite_movies.length === 0
                    ? <Container>
                      <p>Bummer, you have no moves saved.</p>
                      </Container>
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
              <Button className='btn bg-dark' onClick={()=>getAllMovies()} data-bs-toggle="modal" data-bs-target="#exampleModal" >Add a movie!</Button>
            </Col>
            <Col lg={4}>
              <p className='fs-6'>{list.email}</p>
              <p className='fs-6'>{list.birthday}</p>
            </Col>
          </Row>
        </div>
    </Container>
    </>
  )
}
