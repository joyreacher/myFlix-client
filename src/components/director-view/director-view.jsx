import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from '../loading-view/loading-view'
// bootstrap
import { Container, Row, Col, Button, Image, Card, CardGroup, CardImg } from 'react-bootstrap'

export default function Director ({ movies, name, onBackClick }) {
  console.log(movies)
  const [list, setList] = useState([])
  useEffect(()=>{
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
    <div className=''>
      <h1 className='fs-1'>{name}</h1>
      <Container>
        <CardGroup>
          {
            movies.map(movie => {
              if (movie.Director.Name === name) {
                return (
                  <Card className='m-2 bg-light mb-sm-1' key={movie._id}>
                    <Card.Header>{movie.Title}</Card.Header>
                    <Card.Img variant='top' src={movie.ImagePath} />
                    <Card.Body className='p-2'>
                      <Card.Text className='text-truncate'>{movie.Description}</Card.Text>
                    </Card.Body>
                    <Link to={`/movies/${movie._id}`}>
                      <Button className='btn btn-dark'>Open</Button>
                    </Link>
                  </Card>
                )
              }
            })
          }
        </CardGroup>
      </Container>
      <Button onClick={() => onBackClick(null)}>Back</Button>
    </div>
  )
}
