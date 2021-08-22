import React from 'react'
import { Col, Container } from 'react-bootstrap'
import { connect } from 'react-redux'

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input'
import CardList from '../card-list/card-list'

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
      <Col lg={6}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map(m => (
        <Col key={m._id}>
          <CardList movie={m} />
        </Col>
      ))}
    </Container>
  )
}
export default connect(mapStateToProps)(MoviesList)
