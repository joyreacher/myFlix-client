import React from 'react'
import { Link } from 'react-router-dom'
// bootstrap
import { Row, Col, Button, Image, Container, Card, CardColumns } from 'react-bootstrap'
function NotFeatured ({ movies }) {
  return (
    <Row md={3} xl={4} className='gx-4 gx-lg-6 row-cols-2 justify-content-center'>{
      movies.map(movie => {
        if (!movie.Featured) {
          return (
              <Col className='mb-5' key={`not-featured-${movie._id}`}>
                <Card className='h-100 p-2'>
                  <Card.Img className='card-img-top' src={movie.ImagePath} />
                  <Card.Body className=''>
                    <Card.Text className="text-center fw-bolder text-truncate fs-6">
                      {movie.Description}
                    </Card.Text>
                    <Link className="bg-dark" to={`/movies/${movie._id}`}>
                      <Button>
                        More
                      </Button>
                    </Link>
                  </Card.Body>
                  <Card.Footer>
                    <ul className='list-unstyled'>
                      <li>Director: <p className='text-info'>{movie.Director.Name}</p></li>
                      <li>Genre: <p className='text-info'>{movie.Genre.Name}</p></li>
                    </ul>
                  </Card.Footer>
                </Card>
              </Col>
          )
        }
      })
      }
    </Row>
  )
}

export default NotFeatured
