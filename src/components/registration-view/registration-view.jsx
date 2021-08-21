import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { register } from '../../actions/actions'
import './registration-view.scss'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { LoginView } from '../login-view/login-view'

const mapStateToProps = state => {
  const { profile } = state
  return { profile }
}
function RegistrationView (props) {
  const { profile } = props
  const [signin, setSignin] = useState({
    value: ''
  })
  const [user, setUser] = useState({
    value: '',
    errMsg: false
  })
  const [username, setUsername] = useState({
    value: '',
    errMsg: false
  })
  const [password, setPassword] = useState({
    value: '',
    errMsg: false
  })
  const [email, setEmail] = useState({
    value: '',
    errMsg: false
  })
  const [birthday, setBirthday] = useState({
    value: '',
    errMsg: false
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/)
    if (!password.value || password.value.length == 0) {
      setPassword({ value: false, errMsg: 'Enter your password' })
      // console.log(password)
    } if (!username.value || username.value.length == 0) {
      setUsername({ value: false, errMsg: 'Enter a username' })
      // console.log(username)
    } if (!email.value || email.value.length == 0) {
      setEmail({ value: false, errMsg: 'Enter a email' })
      // console.log(email)
    } if (!birthday.value || birthday.value.length == 0) {
      setBirthday({ value: false, errMsg: 'Enter a birthday' })
      // console.log(birthday)
    } if (pattern.test(username.value)) {
      console.log('unwanted chars')
      console.log(username)
      setUsername({ value: false, errMsg: 'Please only use letters and numbers in your username' })
    } else if (username.value, password.value, email.value, birthday.value) {
      axios.post('https://cinema-barn.herokuapp.com/users', {
        Username: username.value,
        Password: password.value,
        Email: email.value,
        Birthday: birthday.value
      }).then(res => {
        console.log(res)
        const data = res.data
        setSignin({ value: <Link className='text-info' to='/'>Success 🙂  click here to Sign in</Link> })
      }).catch(e => {
        if (e.response.status == 422) {
          console.log(e.response.data.errors[0].msg)
          setUser({ value: false, errMsg: e.response.data.errors[0].msg })
        }
        if (e.response.status == 400) {
          console.log(e.response.data)
          setUser({ value: false, errMsg: e.response.data })
        }
      })
    }
  }

  return (
    <Row className='justify-content-center min-vh-100 align-items-center'>
      <Col xs={10} sm={10} md={7} lg={6} xl={7}>
        <Form className='registration__form jumbotron p-5 d-flex flex-column'>
          <Form.Group>
            <Form.Label>
              <h1 className='fs-1 display-1'>Register</h1>
              {user.errMsg ? <h6 className='text-danger'>{user.errMsg}</h6> : ''}
            </Form.Label>
          </Form.Group>
          <Form.Group>
            {/* <label className='text-danger' htmlFor='Username'>{username.errMsg ? username.errMsg : ''}</label> */}
            <FloatingLabel className={username.errMsg ? 'text-danger' : ''} label={username.errMsg ? username.errMsg : 'Username'} controlId='floatingInput'>
              <Form.Control placeholder='Username' type='text' onChange={e => { props.register(e.target.value); setUsername({ value: e.target.value }) }} />
            </FloatingLabel>
            {/* <label className='text-danger' htmlFor='Password'>{password.errMsg ? password.errMsg : ''}</label> */}
            <FloatingLabel className={password.errMsg ? 'text-danger' : ''} label={password.errMsg ? password.errMsg : 'Password'} controlId='floatingInput'>
              <Form.Control placeholder='Password' type='password' onChange={e => { setPassword({ value: e.target.value }) }} />
            </FloatingLabel>
            {/* <label className='text-danger' htmlFor='Email'>{email.errMsg ? email.errMsg : ''}</label> */}
            <FloatingLabel className={email.errMsg ? 'text-danger' : ''} label={email.errMsg ? email.errMsg : 'Email'} controlId='floatingInput'>
              <Form.Control placeholder='Email' type='email' onChange={e => { setEmail({ value: e.target.value }) }} />
            </FloatingLabel>
            {/* <label className='text-danger' htmlFor='Birthday'>{birthday.errMsg ? birthday.errMsg : ''}</label> */}
            <FloatingLabel className={birthday.errMsg ? 'text-danger' : ''} label={birthday.errMsg ? birthday.errMsg : 'Birthday'} controlId='floatingInput'>
              <Form.Control placeholder='Birthday' type='date' onChange={e => { setBirthday({ value: e.target.value }) }} />
            </FloatingLabel>
            {signin.value ? signin.value : ''}
            <Button className='mt-3' variant='success' type='submit' onClick={handleSubmit}>Register</Button>
          </Form.Group>
          <div className='d-flex justify-content-start mt-5'>
            <p className='me-2'>Have an account?</p>
            <Link className='fs-6' to='/'>Sign in</Link>
          </div>
        </Form>
      </Col>
    </Row>
  )
}
export default connect(mapStateToProps, { register })(RegistrationView)
RegistrationView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}
