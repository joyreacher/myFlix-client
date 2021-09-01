import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from '../loading-view/loading-view'
// bootstrap
import { Row, Container, Button, Card, CardGroup, Col } from 'react-bootstrap'

export default function Director ({ movies, name, onBackClick }) {
  console.log(movies)
  const [list, setList] = useState([])
  useEffect(() => {
    const accessToken = localStorage.getItem('token')
    axios.get(`https://cinema-barn.herokuapp.com/directors/${name}`, {
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
        <h1 className='fs-1'>{name}</h1>
          {
            movies.map(movie => {
              if (movie.Director.Name === name) {
                return (
                  <Row lg={12} key={`director-${name}-${movie._id}`} className='my-5'>
                    <Col lg={4}>
                      <img src={movie.ImagePath}/>
                    </Col>
                    <Col lg={7}>
                      <h2>{movie.Title}</h2>
                      <Link to={`/movies/${movie.Genre.Name}`}>{movie.Genre.Name}</Link>
                      <p>{movie.Description}</p>
                      <Link to={`/movies/${movie._id}`}>
                        <button className='btn btn-outline-dark flex-shrink-0'>More</button>
                      </Link>
                    </Col>
                  </Row>
                )
              }
            })
          }
        <button className='btn btn-outline-dark flex-shrink-0' onClick={() => onBackClick(null)}>Back</button>
      </Container>
      
    </>
  )
}
