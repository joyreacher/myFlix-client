import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from '../loading-view/loading-view'
// bootstrap
import { Container, Row, Col, Button, Image } from 'react-bootstrap'
export default function Genre ({ genre, onBackClick }) {
  const [list, setList] = useState([])
  useEffect(() => {
    const accessToken = localStorage.getItem('token')
    axios.get(`https://cinema-barn.herokuapp.com/genre/${genre}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(res => {
      setList(res.data)
      return list
    }).catch(function (error) {
      console.log(error)
    })
  }, [])
  if (list.length === 0) return <Loading />
  console.log(list)
  return (
    <div>
      <Container>
        <h1>All {genre}s</h1>
        {
          list.map(movie => {
            return (
              <Row key={movie._id}>
                <Col>
                  <Image src={movie.ImagePath} />
                </Col>
                <Col>
                  <h2>{movie.Title}</h2>
                  <p className='text-truncate fs-4'>{movie.Description}</p>
                  <Link to={`/movies/${movie._id}`}>
                    <Button className='btn btn-dark'>Open</Button>
                  </Link>
                </Col>
              </Row>
            )
          })
        }
      </Container>
      <Button onClick={() => onBackClick(null)}>Back</Button>
    </div>
  )
}
