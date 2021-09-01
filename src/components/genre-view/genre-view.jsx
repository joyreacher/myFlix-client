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
    <>
      <Container className='my-5'>
        <h1>All {genre}s</h1>
        {
          list.map(movie => {
            return (
              <Row key={`genre-${genre}-${movie._id}`} className='mb-5'>
                <Col lg={4}>
                  <Image src={movie.ImagePath} />
                </Col>
                <Col lg={8}>
                  <h2>{movie.Title}</h2>
                  <Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link>
                  <p className='text-truncate fs-4'>{movie.Description}</p>
                  <Link to={`/movies/${movie._id}`}>
                    <button className='btn btn-outline-dark flex-shrink-0'>More</button>
                  </Link>
                </Col>
              </Row>
            )
          })
        }
        <button className='btn btn-outline-dark flex-shrink-0 ' onClick={() => onBackClick(null)}>Back</button>
      </Container>
    </>
  )
}
