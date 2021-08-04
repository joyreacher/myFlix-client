import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './login-view.scss'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
export function LoginView (props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(
      'This is the username: %c' + username + '%c and password: %c' + password + '. %c',
      'font-size: 1.3rem; color: #fff; background: #1e90ff; padding: 4px',
      '',
      'font-size: 1.3rem; color: #f00; font-weight: bold',
      ''
    )
    // send request to server for auth
    // then call props.onLoggedIn(username)

    props.onLoggedIn(username)
  }

  return (
    <Row className='justify-content-center min-vh-100 align-items-center'>
      <Col xs={10} sm={10} md={7} lg={6} xl={7}>
        <Form className='login__form jumbotron p-5'>
          <Form.Group>
            <Form.Label column='sm' lg={2}>
              <h1>Sign in</h1>
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <FloatingLabel label='Username' controlId='floatingInput'>
              <Form.Control placeholder='Username' type='text' value={username} onChange={e => setUsername(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel label='Password' controlId='floatingInput'>
              <Form.Control placeholder='Password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
            </FloatingLabel>
            <Button variant='success' type='submit' onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Group>
          <Form.Group className='d-flex justify-content-start mt-5'>
            <p className='me-2 text-start'>Dont have an account?</p>
            <a className='' onClick={() => props.onRegisterClick()}>Register</a>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  )
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired
}
