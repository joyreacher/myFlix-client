import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Card, Button} from 'react-bootstrap'

function Featured ({ movies }) {
  return (
    <>
      {
      movies.map(movie => {
        if (movie.Featured === true) {
          return (
            <Col lg={4}>
              <Card className='m-2 mb-sm-1 py-5 px-2' key={`featured-${movie._id}`}>
                <Card.Header className='fs-1 my-4'>{movie.Title}</Card.Header>
                <Link to={`/movies/${movie._id}`}>
                  <Card.Img variant='top' src={movie.ImagePath} />
                </Link>
                <Card.Body className='p-4'>
                  <Card.Text className='text-truncate'>{movie.Description}</Card.Text>
                </Card.Body>
                <Button>Add to favorites</Button>
              </Card>
            </Col>
          )
        }
      })
      }
    </>
  )
}

export default Featured
