import React, { useEffect } from "react"
import axios from 'axios'
import Modal from '../modal/modal'
import { Link } from 'react-router-dom'
import { Container, Row, Col, CardGroup, Card, Form } from 'react-bootstrap'
import './profile.scss'
function ProfileView ({profile, user, loadImage, updateProfile, movies, loadUser, handleUpdate, updatedUser }) {

  // GET USER DATA ON LOAD INCLUDING PICTURE
  useEffect(() => {
    // updatedProfile({})
    const username = localStorage.getItem('user')
    const accessToken = localStorage.getItem('token')
    let mongoData = ''
    axios.get(`https://cinema-barn.herokuapp.com/user/${!updatedUser.username ? user.username : updatedUser.username}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(res => {
      mongoData = res.data
      return mongoData
    }).then(response => {
      const data = response.data
      loadUser(mongoData.username, mongoData.email, mongoData.birthday, mongoData.favorite_movies)
      // updateProfile(false)
      return data
    }).catch(function (error) {
      console.log(error)
    })
  }, [])

  return (
    <>
      <Modal loadUser={loadUser}/>
      <Container>
        {/* <h1 className='d-inline-block custom-heading'>{user.username}'s Profile</h1> */}
        <div className='p-2 my-5'>
          <Row>
            <Col lg={6}>
              <div className='d-flex flex-column-reverse align-items-center'>
                <img className='badge bg-dark text-white ms-1 rounded-pill d-flex w-50' src={loadImage.image} alt='Image goes here' />
              </div>
            </Col>
            <Col lg={6} className='my-5'>
              <h1 className='fs-1'>{user.username}</h1>
              <h2 className='fs-4'>{user.email}</h2>
              <p className='fs-4'>{user.birthday}</p>
            </Col>
            <Col lg={12}>
              <CardGroup className='w-50'>
                {
                  user.favorite_movies.length === 0
                    ? <Container>
                      <p>Bummer, you have no moves saved.</p>
                      </Container>
                    : user.favorite_movies.map(movie => {
                      return (
                        <Card key={movie._id} className='m-3'>
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
              <button className='btn btn-outline-dark flex-shrink-0' data-bs-toggle='modal' data-bs-target='#exampleModal'>Add a movie!</button>
              {/* <Form.Control className='mx-5 w-25 btn btn-outline-dark flex-shrink-0' type='submit' value='update profile' onClick={() => handleUpdate()} /> */}
              {/* <Form.Control className='mx-5 w-25 btn btn-outline-danger flex-shrink-0' type='submit' value='delete profile' onClick={(e) => deleteUser(e)} /> */}
            </Col>
          </Row>
        </div>
      </Container>
    </>
  )
}

export default ProfileView