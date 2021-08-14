import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

function Featured ({ movies }) {
  return (
    <>
      {
      movies.map(movie => {
        if (movie.Featured === true) {
          return (
            <Card className='m-2 bg-light mb-sm-1' key={`featured-${movie._id}`}>
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
    </>
  )
}

export default Featured
