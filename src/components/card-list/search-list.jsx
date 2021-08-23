import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Image } from 'react-bootstrap'

const cardList = (props) => {
  console.log(props.movie.Featured)
  return (
    <Row className='mb-5 justify-content-between align-items-center d-flex' key={`not-featured-${props.movie._id}`}>
      <h2>Search Results</h2>
      <Col xs={12} sm={12} md={4} lg={4} className='my-4'>
        <Image className='mt-5 w-100 h-100' src={props.movie.ImagePath} />
      </Col>
      <Col xs={12} sm={12} md={6} lg={6} className='text-sm-center text-md-start'>
        <h2 className='fs-1'>{props.movie.Title}</h2>
        <p className='fs-6'>{props.movie.Description}</p>
        <Link to={`/movies/${props.movie._id}`}>
          <Button className='btn btn-dark'>Open</Button>
        </Link>
      </Col>
    </Row>
  )
}

export default cardList
