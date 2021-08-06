import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './registration-view.scss'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
export function RegistrationView (props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(username, password, email, birthday)
    console.log(
      'This is the username: %c' + username + '%c and password: %c' + password + '. %c. Your email is: %c' + email + '%c and your birthday is: %c' + birthday,
      'font-size: 1.3rem; color: #fff; background: #1e90ff; padding: 4px',
      '',
      'font-size: 1.3rem; color: #f00; font-weight: bold',
      '',
      'font-size: 1.3rem; color: black; background: yellow; padding: 4px',
      '',
      'font-size: 1.3rem; color: #f00; font-weight: bold'
    )

    /**
      CREATES USER AND SET REGISTRATION TO FALSE
      on real app --once user registers redirect them back to login page
      for now redirect to movie list
     */
    props.onLoggedIn(username)
  }

  return (
    <Row className='justify-content-center min-vh-100 align-items-center'>
      <Col xs={10} sm={10} md={7} lg={6} xl={7}>
        <Form className='registration__form jumbotron p-5 d-flex flex-column'>
          <Form.Group>
            <Form.Label>
              <h1 className='fs-1 display-1'>Register</h1>
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <FloatingLabel label='Username' controlId='floatingInput'>
              <Form.Control placeholder='Username' type='text' onChange={e => { setUsername(e.target.value) }} />
            </FloatingLabel>
            <FloatingLabel label='Password' controlId='floatingInput'>
              <Form.Control placeholder='Password' type='password' onChange={e => { setPassword(e.target.value) }} />
            </FloatingLabel>
            <FloatingLabel label='Email' controlId='floatingInput'>
              <Form.Control placeholder='Email' type='email' onChange={e => { setEmail(e.target.value) }} />
            </FloatingLabel>
            <FloatingLabel label='Birthday' controlId='floatingInput'>
              <Form.Control placeholder='Birthday' type='date' onChange={e => { setBirthday(e.target.value) }} />
            </FloatingLabel>
            <Button variant='success' type='submit' onClick={handleSubmit}>Register</Button>
          </Form.Group>
          <div className='d-flex justify-content-start mt-5'>
            <p className='me-2'>Have an account?</p>
            {/* <a className='' onClick={() => props.onRegisterClick()}>Sign in</a> */}
            <Link className='fs-6' to={`/`} >Sign in</Link>
          </div>
        </Form>
      </Col>
    </Row>
  )
}

RegistrationView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}
