import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
// bootstrap
import { Row, Col, Button, Image } from 'react-bootstrap'
function NotFeatured ({ movies }) {
  return (
    <>{
      movies.map(movie => {
        if (!movie.Featured) {
          return (
            <Row className='mb-5 justify-content-between align-items-center d-flex' key={`not-featured-${movie._id}`}>
              <Col xs={12} sm={12} md={4} lg={3} className='d-sm-flex justify-content-sm-center px-4 my-4'>
                <Image className='mt-5' src={movie.ImagePath} />
              </Col>
              <Col xs={12} sm={12} md={6} lg={8} className='text-sm-center text-md-start'>
                <h2 className='fs-1'>{movie.Title}</h2>
                <p className='text-truncate fs-4'>{movie.Description}</p>
                <Link to={`/movies/${movie._id}`}>
                  <Button className='btn btn-dark'>Open</Button>
                </Link>
              </Col>
            </Row>
          )
        }
      })
      }
    </>
  )
}

export default NotFeatured
