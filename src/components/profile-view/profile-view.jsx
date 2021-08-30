import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from '../loading-view/loading-view'
import { Row, Col, Container, Button, Form, CardGroup, Card, FloatingLabel } from 'react-bootstrap'
import './profile-view.scss'
// ACTIONS
import { updatedProfile, updateProfile, loadUser, add, remove, load, cancelUpdate, error } from '../../actions/actions'

const mapStateToProps = state => {
  const { profile, user, selectedMovies, updatedUser, error } = state
  return { profile, user, selectedMovies, updatedUser, error }
}

function ProfileView ({ user, error, updatedProfile, updatedUser, onLoggedIn, getMovies, username, handleUpdate, profile, updateProfile, loadUser, add, selectedMovies, remove, load, cancelUpdate }) {
  const [list, setList] = useState([])
  const [randomImg, setRandomImg] = useState([])
  const [modal, setModal] = useState(false)
  const [movies, setMovies] = useState([])
  const [password, setPassword] = useState('')
  const removeMovie = []

  // if a movie is marked for delation
  const deleteMovies = (e) => {
    // console.log(e.target.checked)
    if (removeMovie < 1) {
      // IS MOFRE THAN ONE MOVIE
      user.favorite_movies.forEach(movie => {
        if (e.target.value == movie._id) {
          // console.log(movie.Title + ' has got to go.')
          removeMovie.push(movie)
        }
      })
    } else {
      // IF THERE IS ONLY ONE MOVIE
      removeMovie.push(user.favorite_movies[0])
    }
    console.log(removeMovie)
  }

  const handleSubmitUpdate = (e) => {
    e.preventDefault()
    const accessToken = localStorage.getItem('token')

    // console.log(removeMovie)
    // deletes movies stored in removeMoves array
    // if (removeMovie.length != 0) {
    //   console.log(removeMovie)
    //   removeMovie.map(movie => {
    //     axios.post('https://cinema-barn.herokuapp.com/users/mymovies/delete', {
    //       Username: user.username,
    //       Title: movie.Title
    //     }, { headers: { Authorization: `Bearer ${accessToken}` } })
    //       .then(res => {
    //         const data = res.data
    //         console.log(data) // so and so was deleted
    //         handleUpdate()
    //       }).catch(e => {
    //         error('This is the check on 70')
    //         console.log(e)
    //         return 'Something went wrong'
    //       })
    //   })
    // }

    // Error check
    // TODO: error trips when changing user data
    error('this is a test')
    console.log(error('test'))
    console.log(error)
    console.log(error == true)
    if (error) {
      error('This is the check on 78')
    }
    if (!updatedUser.password) {
      return setPassword('Please enter a password')
    }
    if (updatedUser.password !== password) {
      return setPassword('Passwords must match')
    }

    axios.put(`https://cinema-barn.herokuapp.com/users/${user.username}`, {
      Username: !updatedUser.username ? user.username : updatedUser.username,
      Password: updatedUser.password,
      Email: !updatedUser.email ? user.email : updatedUser.email,
      Birthday: !updatedUser.birthday ? user.birthday : updatedUser.birthday
    }, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(res => {
        const data = res.data
        localStorage.setItem('user', !updatedUser.username ? profile.username : updatedUser.username)
        updatedProfile(
          {
            username: !updatedUser.username ? profile.username : updatedUser.username,
            password: data.password,
            email: data.email,
            birthday: data.birthday
          }
        )
        updateProfile('', '', '', '', '')
        console.log(profile)
        window.location.reload()
        // handleUpdate()
      }).catch(e => {
        // TODO: error triped when updating user info and username
        // TODO: all information is updating will need to update user state to finish request and update navbar
        error('This is the check on 112')
        console.log(e)
      })
  }

  const deleteUser = (e) => {
    e.preventDefault()
    alert('are you sure you want to delete your profile?')
    const accessToken = localStorage.getItem('token')
    axios.post('https://cinema-barn.herokuapp.com/users/unregister', {
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

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const accessToken = localStorage.getItem('token')
  //   if (selectedMovies.movies.length > 1) {
  //     selectedMovies.movies.forEach(selected => {
  //       console.log(selected)
  //       return axios.post('https://cinema-barn.herokuapp.com/users/mymovies/add', {
  //         Username: user.username,
  //         Title: selected.title
  //       }, {
  //         headers: { Authorization: `Bearer ${accessToken}` }
  //       }).then(res => {
  //         window.location.reload()
  //       }).catch(e => {
  //         console.log(e)
  //       })
  //     })
  //   } else {
  //     return axios.post('https://cinema-barn.herokuapp.com/users/mymovies/add', {
  //       Username: user.username,
  //       Title: selectedMovies.movies[0].title
  //     }, {
  //       headers: { Authorization: `Bearer ${accessToken}` }
  //     }).then(res => {
  //       // setSub(null)
  //       const data = res.data
  //       console.log(data)
  //       window.location.reload()
  //     })
  //       .catch(e => {
  //         console.log(e)
  //       })
  //   }
  // }

  const addMovies = (e) => {
    console.log(e.target)
    if (e.target.checked) {
      // check db for movie
      const result = movies.find(({ _id }) => _id === e.target.value)
      // check favorite movies in user state
      const matchFavs = user.favorite_movies.find(({ _id }) => _id === e.target.value)
      if (matchFavs) {
        e.target.setAttribute('match', true)
        e.target.setAttribute('disabled', 'disabled')
        e.target.insertAdjacentHTML('afterend', "<span style='color:red'>This movie is in your favorites</span>")
        return false
      } else {
        console.log('add')
        return add(result)
      }
    }
    if (!e.target.checked) {
      console.log('remove')
      return remove(e.target.value)
    }
  }

  const cancelChanges = () => {
    updateProfile(false)
  }
  const updateInformation = (e) => {
    updateProfile(true)
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
    const username = localStorage.getItem('user')
    const accessToken = localStorage.getItem('token')
    let mongoData = ''
    axios.get(`https://cinema-barn.herokuapp.com/user/${username}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(res => {
      mongoData = res.data
      console.log(mongoData.favorite_movies)
      return axios.get('https://randomuser.me/api/?results=1')
    }).then(response => {
      const data = response.data
      setRandomImg(
        {
          picture: response.data.results[0].picture.large
        }
      )
      loadUser(mongoData.username, response.data.results[0].picture.large, mongoData.email, mongoData.birthday, mongoData.favorite_movies)
      return data
    }).catch(function (error) {
      console.log(error)
    })
  }, [])

  if (!randomImg.picture) return <Loading />
  if (profile.update) {
    return (
      <>
        <h1>{user.username}'s Profile</h1>
        <Form.Control className='mx-5 w-25' type='submit' value='submit' onClick={handleSubmitUpdate} readOnly/>
        <Form.Control className='mx-5 w-25' onClick={()=> cancelChanges(false)} value='cancel' readOnly/>
        <div>
          <Form onSubmit={handleSubmitUpdate}>
            <Row>
              <Col>
                <img src={randomImg.picture} />
                <Form.Group>
                  <FloatingLabel label={user.username} controlId='Username'>
                    <Form.Control placeholder='Username' type='text' onChange={e => updatedProfile(e.target.value, updatedUser.password, updatedUser.email, updatedUser.birthday, updatedUser.favorite_movies)} />
                  </FloatingLabel>
                  {!error.text ? '' : error('test')}
                  <FloatingLabel label='Password' controlId='Password'>
                    <Form.Control placeholder='Password' type='password' onChange={e => updatedProfile(updatedUser.username, e.target.value, updatedUser.email, updatedUser.birthday, updatedUser.favorite_movies)} />
                  </FloatingLabel>
                  <FloatingLabel label='Re-enter Password' controlId='Password'>
                    <Form.Control placeholder='Re-enter Password' type='password' onChange={e => setPassword(e.target.value)} />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col lg={4}>
                <CardGroup>
                  {
                    user.favorite_movies.length === 0
                      ? <Container>
                        <p>No movies to show 🤦 </p>
                        </Container>
                      : user.favorite_movies.map(movie => {
                        return (
                          <Card key={movie._id} className='m-3 p-2'>
                            <Form.Label className='btn btn-secondary' htmlFor={movie._id}>
                              <Card.Img src={movie.ImagePath} />
                            </Form.Label>
                            <Card.Title>{movie.Title}</Card.Title>
                            <Form.Check id={movie._id} label='Delete' value={movie._id} onChange={(e) => { deleteMovies(e) }} />
                          </Card>
                        )
                      })
                  }
                </CardGroup>
              </Col>
              <Col>
                <Form.Group>
                  <FloatingLabel label={user.email} controlId='Email'>
                    <Form.Control placeholder='Email' type='text' onChange={e => updatedProfile(updatedUser.username, updatedUser.password, e.target.value, updatedUser.birthday, updatedUser.favorite_movies)} />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group>
                  <FloatingLabel label={user.birthday} controlId='Birthday'>
                    <Form.Control type='date' value={user.birthday} onChange={e => updatedProfile(updatedUser.username, updatedUser.password, updatedUser.email, e.target.value, updatedUser.favorite_movies)} />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>
      </>
    )
  }
  return (
    <>
      <div className='modal' tabIndex='-1' id='exampleModal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Add movie to your favorites list</h5>
              <button onClick={() => setModal(false)} type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' />
            </div>
            <div className='modal-body'>
              <Form onSubmit={(e) => handleSubmit(e)}>
                <CardGroup>
                  {movies.length == 0
                    ? '..loading'
                    : movies.map(movie => {
                      return (
                        <Col key={movie._id} lg={3} className=''>
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
                <Form.Group className='modal-footer'>
                  <Form.Control type='button' className='btn btn-secondary' data-bs-dismiss='modal' value='cancel' />
                  <Form.Control type='submit' className='btn btn-primary' value='Add' data-bs-toggle='modal' data-bs-target='#exampleModal' />
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Container>
        <h1 className='my-5 bg-dark text-light d-inline-block'>{profile.username}'s Profile</h1>
        <Row className='my-5'>
          <Col lg={8} className='d-flex justify-content-lg-between w-100'>
            <Form.Control className='mx-5 w-25' type='submit' value='update profile' onClick={() => updateInformation()} />
            <Form.Control className='mx-5 w-25' type='submit' value='delete profile' onClick={(e) => deleteUser(e)} />
          </Col>
        </Row>
        <div className='d-flex justify-content-center p-2 my-5'>
          <Row>
            <Col lg={4}>
              <img src={randomImg.picture} alt='Image goes here' />
              <p>{user.username}</p>
            </Col>
            <Col lg={4}>
              <CardGroup>
                {
                  user.favorite_movies.length === 0
                    ? <Container>
                      <p>Bummer, you have no moves saved.</p>
                      </Container>
                    : user.favorite_movies.map(movie => {
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
              <Button className='btn bg-dark' onClick={() => getAllMovies()} data-bs-toggle='modal' data-bs-target='#exampleModal'>Add a movie!</Button>
            </Col>
            <Col lg={4}>
              <p className='fs-6'>{user.email}</p>
              <p className='fs-6'>{user.birthday}</p>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  )
}
export default connect(mapStateToProps, { updateProfile, loadUser, add, remove, load, cancelUpdate, error, updatedProfile })(ProfileView)
