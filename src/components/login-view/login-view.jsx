import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'
import './login-view.scss'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
export function LoginView (props) {
  const [username, setUsername] = useState({
    value: '',
    errMsg: ''
  })
  // console.log(username.value == false)
  const [password, setPassword] = useState({
    value: '',
    errMsg: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/)
    console.log(username.value)
    if (!password.value || password.value.length == 0) {
      setPassword({ errMsg: 'Enter your password' })
      // console.log(password)
    } if (!username.value || username.value.length == 0) {
      setUsername({ errMsg: 'Enter a username' })
      // console.log(username)
    } if (pattern.test(username.value)) {
      console.log('unwanted chars')
      setUsername({ value: false, errMsg: 'Please only use letters and numbers in your username' })
      console.log(username)
    } else {
      axios.post('https://cinema-barn.herokuapp.com/login', {
        Username: username.value,
        Password: password.value
      }).then(res => {
        const data = res.data
        props.onLoggedIn(data)
      }).catch(e => {
        console.log('no such user')
      })
    }
  }

  return (
    <Row className='justify-content-center min-vh-100 align-items-center'>
      <Col xs={10} sm={10} md={7} lg={6} xl={7}>
        <Form className='login__form jumbotron p-5' onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label column='sm'>
              <h1 className='fs-1 display-1'>Sign in</h1>
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <FloatingLabel label='Username' controlId='floatingInput'>
              <Form.Control name='username' placeholder='Username' type='text' value={username.value || ''} onChange={e => setUsername({ value: e.target.value })} />
            </FloatingLabel>
            <label className='text-danger'>
              {
                username.errMsg ? username.errMsg : ''
              }
            </label>
            <FloatingLabel label='Password' controlId='floatingInput'>
              <Form.Control name='pass' placeholder='Password' type='password' value={password.value || ''} onChange={e => setPassword({ value: e.target.value })} />
            </FloatingLabel>
            <label className='text-danger'>
              {
                !password.value ? password.errMsg : ''
              }
            </label>
            <Form.Control type='submit' value='submit' />
          </Form.Group>
          <Form.Group className='d-flex justify-content-start mt-5'>
            <p className='me-2 text-start'>Dont have an account?</p>
            <Link className='fs-6' to={'/register'} >Register</Link>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  )
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
}
