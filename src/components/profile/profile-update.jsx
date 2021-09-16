import React, { useEffect, useRef, useState } from "react"
import axios from 'axios'
import { Card, Container, Row, Col, Form, FloatingLabel, CardGroup } from 'react-bootstrap'
import { cancelUpdate } from "../../actions/actions"

function ProfileUpdate({ user, loadImage, loadUser, updatedProfile, updatedUser, updateProfile, profile, cancelUpdate }) {
  const removeMovieRef = useRef('')
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)
  const emailRef = useRef(null)
  const birthdayRef = useRef(null)
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('')
  const [profileError, setProfileError] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    birthday: ''
  })
  // profileError={profileError} setProfileError={setProfileError} passowrd={password} setPassword={setPassword}
  const cancelChanges = () => {
    updateProfile(false)
    setProfileError({
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      birthday: ''
    })
    user.updatedProfile('', '', '') // reset updatedUser state
  }

  const deleteMovies = (e) => {
    const accessToken = localStorage.getItem('token')
    e.preventDefault()
    // console.log(removeMovieRef.current.id)

    return axios.post('https://cinema-barn.herokuapp.com/users/mymovies/delete', {
      Username: user.username,
      Title: e.target.value
    }, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(res => {
      // window.location.reload()
      const data = res.data
      console.log(data)
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
    })
      .catch(e => {
        console.log(e)
      })
  }

  const passwordMatch = (e) => {
    const newPassword = passwordRef.current.value
    if (e.target.value != newPassword) {
      setProfileError(
        {
          username: !usernameRef.current.value ? <p className='text-danger'>Enter a username</p> : '',
          password: !passwordRef.current.value ? <p className='text-danger'>Enter a password</p> : '',
          passwordConfirm: <p className='text-danger'>Passwords done match</p>,
          email: !emailRef.current.value ? <p className='text-danger'>Enter an email address</p> : '',
          birthday: !birthdayRef.current.value ? <p className='text-danger'>Enter your birthday</p> : ''
        }
      )
    } else {
      setProfileError(
        {
          username: !usernameRef.current.value ? <p className='text-danger'>Enter a username</p> : '',
          password: !passwordRef.current.value ? <p className='text-danger'>Enter a password</p> : '',
          passwordConfirm: '',
          email: !emailRef.current.value ? '' : <p className='text-danger'>Enter an email address</p>,
          birthday: !birthdayRef.current.value ? '' : <p className='text-danger'>Enter your birthday</p>
        }
      )
    }
  }

  const handleSubmitUpdate = (e) => {
    e.preventDefault()
    const accessToken = localStorage.getItem('token')
    const pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?.]/)
    if (pattern.test(usernameRef.current.value)) {
      console.log('unwanted chars')
      return setNotification('Please only use letters and numbers in your username. No spaces.')
    }
    if (usernameRef.current.value.length < 5) {
      return setProfileError(
        {
          username: <p className='text-danger'>Username needs to be more than 5 chars</p>,
          password: !passwordRef.current.value ? <p className='text-danger'>Enter a password</p> : '',
          passwordConfirm: !confirmPasswordRef.current.value ? <p className='text-danger'>Passwords done match</p> : '',
          email: !emailRef.current.value ? <p className='text-danger'>Enter an email address</p> : '',
          birthday: !birthdayRef.current.value ? <p className='text-danger'>Enter your birthday</p> : ''
        }
      )
    }
    if (!usernameRef.current.value || !passwordRef.current.value || !confirmPasswordRef || !emailRef || !birthdayRef) {
      return setProfileError(
        {
          username: !usernameRef.current.value ? <p className='text-danger'>Enter a username</p> : '',
          password: !passwordRef.current.value ? <p className='text-danger'>Enter a password</p> : '',
          passwordConfirm: !confirmPasswordRef.current.value ? <p className='text-danger'>Passwords done match</p> : '',
          email: !emailRef.current.value ? <p className='text-danger'>Enter an email address</p> : '',
          birthday: !birthdayRef.current.value ? <p className='text-danger'>Enter your birthday</p> : ''
        }
      )
    } else {
      return axios.put(`https://cinema-barn.herokuapp.com/users/${user.username}`, {
        // send new data
        Username: usernameRef.current.value,
        Password: passwordRef.current.value,
        Email: emailRef.current.value,
        Birthday: birthdayRef.current.value
      }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      }).then(res => {
        localStorage.setItem('user', usernameRef.current.value)
        // const accessToken = localStorage.getItem('token')
        axios.get(`https://cinema-barn.herokuapp.com/user/${usernameRef.current.value}`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        }).then(res => {
          let mongoData = ''
          mongoData = res.data
          loadUser(mongoData.username, mongoData.email, mongoData.birthday, mongoData.favorite_movies)
          return cancelUpdate()
          // return user.updateProfile(false)
        })
      }).catch(e => {
        if (e.response.status == 422) {
          
          console.log(e.response.data.errors[0].msg)
          setNotification(e.response.data.errors[0].msg)
        }
        if (e.response.status == 400) {
          console.log(e.response.data)
        }
      })
    }
  }
  
  return (
    <Container>
    <h1 className='my-5 bg-dark text-light d-inline-block'>{user.username}'s Profile</h1>
    <Row>
      <Col lg={6}>
        <img className='badge bg-dark text-white ms-1 rounded-pill d-flex w-50' src={loadImage.image} />
        {notification === '' ? '' : notification}
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
                    setNotification('')
                    updatedProfile(e.target.value, updatedProfile.password, updatedProfile.email, updatedProfile.birthday, updatedProfile.favorite_movies)
                  }}
                />
              </FloatingLabel>
              <FloatingLabel label='Password' controlId='Password'>
                {!profileError.password ? '' : profileError.password}
                <Form.Control
                  ref={passwordRef}
                  placeholder='Password'
                  type='password'
                  onChange={e => {
                    profileError.password = ''
                    updatedProfile(updatedProfile.username, e.target.value, updatedProfile.email, updatedProfile.birthday, updatedProfile.favorite_movies)
                  }}
                />
              </FloatingLabel>
              <FloatingLabel label='Re-enter Password' controlId='Password'>
                {!profileError.passwordConfirm ? '' : profileError.passwordConfirm}
                <Form.Control
                  ref={confirmPasswordRef}
                  placeholder='Re-enter Password'
                  type='password'
                  onChange={e => {
                    passwordMatch(e)
                    profileError.passwordConfirm = ''
                    setPassword(e.target.value)
                  }}
                />
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
                    updatedProfile(updatedProfile.username, updatedProfile.password, e.target.value, updatedProfile.birthday, updatedProfile.favorite_movies)
                  }}
                />
              </FloatingLabel>
              <FloatingLabel label={user.birthday} controlId='Birthday'>
                {!profileError.birthday ? '' : profileError.birthday}
                <Form.Control
                  ref={birthdayRef}
                  type='date'
                  value={birthdayRef.birthday}
                  onChange={e => {
                    profileError.birthday = ''
                    updatedProfile(updatedProfile.username, updatedProfile.password, updatedProfile.email, e.target.value, updatedProfile.favorite_movies)
                  }}
                />
              </FloatingLabel>
            </Form.Group>
          </Row>
        </Form>
      </Col>
      <Col lg={12} className='d-flex my-5 justify-content-around'>
        <Form.Control className={!profileError.password ? 'mx-5 w-25 btn btn-outline-dark flex-shrink-0' : 'mx-5 w-25 btn btn-outline-danger flex-shrink-0'} type='submit' value='submit' onClick={handleSubmitUpdate} />
        <Form.Control className={!profileError.password ? 'mx-5 w-25 btn btn-outline-dark flex-shrink-0' : 'mx-5 w-25 btn btn-outline-danger flex-shrink-0'} type='submit' onClick={() => cancelChanges(false)} value='cancel' />
      </Col>
      <Col lg={12}>
        <Form id='delete'>
          <CardGroup className='w-50'>
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
    </Row>
  </Container>
  )
}

export default ProfileUpdate