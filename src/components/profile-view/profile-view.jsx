import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from '../loading-view/loading-view'
import { Row, Col, Container, Button, Form, CardGroup, Card, FloatingLabel } from 'react-bootstrap'
import './profile-view.scss'
// ACTIONS
import { image, updatedProfile, updateProfile, loadUser, add, remove, load, cancelUpdate } from '../../actions/actions'

const mapStateToProps = state => {
  const { profile, user, selectedMovies, updatedUser, loadImage } = state
  return { profile, user, selectedMovies, updatedUser, loadImage }
}

function ProfileView ({ user, updatedProfile, updatedUser, handleUpdate, profile, updateProfile, loadUser, loadImage }) {
  console.log('this is the image')
  console.log(loadImage)
  const [list, setList] = useState([])
  const [modal, setModal] = useState(false)
  let [movies, setMovies] = useState([])
  const [password, setPassword] = useState('')
  const removeMovieRef = useRef('')
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)
  const emailRef = useRef(null)
  const birthdayRef = useRef(null)
  const [profileError, setProfileError] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    birthday: ''
  })
  // if a movie is marked for delation
  const deleteMovies = (e) => {
    const accessToken = localStorage.getItem('token')
    e.preventDefault()
    console.log(e.target.value)
    // console.log(removeMovieRef.current.id)

    return axios.post('https://cinema-barn.herokuapp.com/users/mymovies/delete', {
      Username: user.username,
      Title: e.target.value
    }, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(res => {
      // setSub(null)
      const data = res.data
      console.log(data)
      window.location.reload()
    })
      .catch(e => {
        console.log(e)
      })
  }

  const handleSubmitUpdate = (e) => {
    e.preventDefault()
    if (!usernameRef.current.value || !passwordRef.current.value || !confirmPasswordRef || !emailRef || !birthdayRef) {
      // if (!usernameRef.current.value) {
      setProfileError(
        {
          username: !usernameRef.current.value ? <p className='text-danger'>Enter a username</p> : '',
          password: !passwordRef.current.value ? <p className='text-danger'>Enter a password</p> : '',
          passwordConfirm: !confirmPasswordRef.current.value ? <p className='text-danger'>Passwords done match</p> : '',
          email: !emailRef.current.value ? <p className='text-danger'>Passwords do not match</p> : '',
          birthday: !birthdayRef.current.value ? <p className='text-danger'>Enter your birthday</p> : ''
        }
      )
    } else {
      console.log('submit no errros!')
    }
    console.log(profileError)
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const accessToken = localStorage.getItem('token')
    error('')
    console.log(e.target)
    // check db for movie
    const result = movies.find(({ _id }) => _id === e.target.value)
    console.log('resulttttt')
    console.log(result)
    // check favorite movies in user state
    const matchFavs = user.favorite_movies.find(({ _id }) => _id === e.target.value)
    if (matchFavs) {
      e.target.setAttribute('match', true)
      e.target.setAttribute('disabled', 'disabled')
      e.target.insertAdjacentHTML('afterend', "<span style='color:red'>This movie is in your favorites</span>")
      return false
    } else {
      return axios.post('https://cinema-barn.herokuapp.com/users/mymovies/add', {
        Username: user.username,
        Title: result.title
      }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      }).then(res => {
        // setSub(null)
        const data = res.data
        console.log(data)
        window.location.reload()
      })
        .catch(e => {
          console.log(e)
        })
    }
  }

  const cancelChanges = () => {
    updateProfile(false)
    setProfileError({
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      birthday: ''
    })
    updatedProfile('', '', '') // reset updatedUser state
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
      // const remove = movies.map(({ _id }) => _id === user.favorite_movies._id)
      console.log(movies)
      console.log(user.favorite_movies)
      user.favorite_movies.map((movie, i) => {
        if (movies[i]._id != movie._id) {
          console.log(movies[i].title)
        }
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
      return mongoData
    }).then(response => {
      const data = response.data
      loadUser(mongoData.username, mongoData.email, mongoData.birthday, mongoData.favorite_movies)
      return data
    }).catch(function (error) {
      console.log(error)
    })
  }, [])

  if (!loadImage.image) return <Loading />
  if (profile.update) {
    return (
      <Container>
        <h1 className='my-5 bg-dark text-light d-inline-block'>{user.username}'s Profile</h1>
        <Row>
          {/* <Form> */}
            {/* <Row> */}
              <Col lg={6}>
                <img className='badge bg-dark text-white ms-1 rounded-pill d-flex w-50' src={loadImage.image} />
              </Col>
              <Col lg={6} className='mb-5'>
                <Form>
                  <Row>
                    <Form.Group className='m-3 '>
                      <FloatingLabel label={user.username} controlId='Username'>
                        {!profileError.username ? '' : profileError.username}
                        <Form.Control
                          ref={usernameRef}
                          placeholder='Username'
                          type='text'
                          onChange={e => {
                            profileError.username = ''
                            updatedProfile(e.target.value, updatedUser.password, updatedUser.email, updatedUser.birthday, updatedUser.favorite_movies)
                          }} />
                      </FloatingLabel>
                      <FloatingLabel label='Password' controlId='Password'>
                        {!profileError.password ? '' : profileError.password}
                        <Form.Control 
                          ref={passwordRef} 
                          placeholder='Password' 
                          type='password' 
                          onChange={e => {
                            // setProfileError({password: ''})
                            profileError.password = ''
                            updatedProfile(updatedUser.username, e.target.value, updatedUser.email, updatedUser.birthday, updatedUser.favorite_movies)
                          }} />
                      </FloatingLabel>
                      <FloatingLabel label='Re-enter Password' controlId='Password'>
                        {!profileError.passwordConfirm ? '' : profileError.passwordConfirm}
                        <Form.Control ref={confirmPasswordRef} placeholder='Re-enter Password' type='password' onChange={e => setPassword(e.target.value)} />
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className='m-3'>
                      <FloatingLabel label={user.email} controlId='Email'>
                        {!profileError.email ? '' : profileError.email}
                        <Form.Control
                          ref={emailRef}
                          placeholder='Email'
                          type='text'
                          onChange={e => {
                            profileError.email = ''
                            updatedProfile(updatedUser.username, updatedUser.password, e.target.value, updatedUser.birthday, updatedUser.favorite_movies)
                          }} />
                      </FloatingLabel>
                      <FloatingLabel label={user.birthday} controlId='Birthday'>
                        {!profileError.birthday ? '' : profileError.birthday}
                        <Form.Control 
                          ref={birthdayRef}
                          type='date'
                          value={birthdayRef.birthday}
                          onChange={e => {
                            profileError.birthday = ''
                            updatedProfile(updatedUser.username, updatedUser.password, updatedUser.email, e.target.value, updatedUser.favorite_movies)
                          }} />
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                </Form>
              </Col>
              <Col lg={12}>
                <Form id='delete'>
                <CardGroup className=''>
                  {
                    user.favorite_movies.length === 0
                      ? <Container>
                        <p>No movies to show 🤦 </p>
                        </Container>
                      : user.favorite_movies.map(movie => {
                        return (
                          <Card key={movie._id} className='m-3'>
                            <Card.Img src={movie.ImagePath} />
                            <Form.Label className='btn btn-secondary' htmlFor={movie._id}>Delete</Form.Label>
                            <Form.Control className='d-none' type='button' ref={removeMovieRef} id={movie._id} name={movie.Title} value={movie.Title} onClick={(e) => { deleteMovies(e) }} />
                          </Card>
                        )
                      })
                  }
                </CardGroup>
                </Form>
              </Col>
              <Col lg={12} className='d-flex my-5 justify-content-around'>
                <Form.Control className='w-25' type='submit' value='submit' onClick={handleSubmitUpdate} readOnly/>
                <Form.Control className='w-25' onClick={()=> cancelChanges(false)} value='cancel' readOnly/>
              </Col>
            {/* </Row> */}
          {/* </Form> */}
        </Row>
      </Container>
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
              <Form onSubmit={handleSubmit}>
                <CardGroup>
                  {movies.length == 0
                    ? '..loading'
                    : movies.map(movie => {
                      return (
                        <Col key={movie._id} lg={6} className=''>
                          <Card>
                            <Card.Title className='movie__title fs-6'>{movie.title}</Card.Title>
                            <Form.Label htmlFor={movie._id} className='btn btn-secondary'>
                              <Card.Img src={movie.ImgPath} className='movie__img' />
                            </Form.Label>
                            <input readOnly className='d-none' id={movie._id} value={movie._id} />
                            <Button onClick={handleSubmit} value={movie._id} type='submit' className='fs-6'>Add to favorites</Button>
                          </Card>
                        </Col>
                      )
                    })}
                </CardGroup>
                <Form.Group className='modal-footer'>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
      {/* section start */}
      <Container>
        <h1 className='my-5 bg-dark text-light d-inline-block'>{profile.username}'s Profile</h1>
        <div className='p-2 my-5'>
          <Row>
            <Col lg={6}>
              <div className='d-flex flex-column-reverse align-items-center'>
                <img className='badge bg-dark text-white ms-1 rounded-pill d-flex w-50' src={loadImage.image} alt='Image goes here' />  
              </div>
            </Col>
            <Col lg={6} className='my-5'>
              <p className='fs-1'>{user.username}</p>
              <p className='fs-4'>{user.email}</p>
              <p className='fs-4'>{user.birthday}</p>
            </Col>
            <Col lg={12}>
              <CardGroup>
                {
                  user.favorite_movies.length === 0
                    ? <Container>
                      <p>Bummer, you have no moves saved.</p>
                      </Container>
                    : user.favorite_movies.map(movie => {
                      return (
                        <Card key={movie._id} className='m-3 '>
                          <Link to={`/movies/${movie._id}`}>
                            <Card.Img src={movie.ImagePath} alt='no image available' />
                          </Link>
                        </Card>
                      )
                    })
                }
              </CardGroup>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col lg={8} className='d-flex justify-content-lg-between w-100'>
              <button className='btn btn-outline-dark flex-shrink-0' onClick={getAllMovies} data-bs-toggle='modal' data-bs-target='#exampleModal'>Add a movie!</button>
              <Form.Control className='mx-5 w-25' type='submit' value='update profile' onClick={() => updateInformation()} />
              <Form.Control className='mx-5 w-25' type='submit' value='delete profile' onClick={(e) => deleteUser(e)} />
            </Col>
          </Row>
        </div>
      </Container>
    </>
  )
}
export default connect(mapStateToProps, { updateProfile, loadUser, add, remove, load, cancelUpdate, updatedProfile, image })(ProfileView)
