import React from 'react'
import { Col, Container, Row, Image, CardGroup } from 'react-bootstrap'
import { connect } from 'react-redux'

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input'
import CardList from '../card-list/card-list'
import NotFeatured from '../not-featured/not-featured'
import Featured from '../featured/featured'

const mapStateToProps = state => {
  const { visibilityFilter } = state
  return { visibilityFilter }
}

function MoviesList (props) {
  const { movies, visibilityFilter } = props
  // console.log(movies)
  let filteredMovies = movies
  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()))
  }
  if (!movies) return <div className='main-view'>wtf</div>
  return (
    <Container>
      <Row>
        <Col>
          <p>Search for a movie</p>
        </Col>
        <Col lg={9}>
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
      </Row>
      {visibilityFilter ? filteredMovies.map(m => { return <Col key={m._id}><CardList movie={m} /></Col> }) : ''}
      <Row>
        <Col>
          <h2>Featured</h2>
          <CardGroup>
            <Featured movies={movies}/>
          </CardGroup>
        </Col>
        <Col>
          <h2>Browse</h2>
          <NotFeatured movies={movies}/>
        </Col>
      </Row>
    </Container>
  )
}
export default connect(mapStateToProps)(MoviesList)
