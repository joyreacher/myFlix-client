import React from 'react'
import { Col, Container, Row, CardGroup } from 'react-bootstrap'
import { connect } from 'react-redux'

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input'
import SearchList from '../card-list/search-list'
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
        <Col lg={12}>
          <div className='my-5'>
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
          </div>
        </Col>
      </Row>
      {visibilityFilter ? filteredMovies.map(m => { return <Row key={m._id}><SearchList movie={m} /></Row> }) : ''}
      {filteredMovies.length == 0 && visibilityFilter ? <h2 className='text-danger'>No results to display</h2> : ''}
      <Row>
        <Col>
          <h2 className='fs-1 mt-5'>Featured</h2>
          <CardGroup>
            <Featured movies={movies} />
          </CardGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className=''>Browse</h2>
          <NotFeatured movies={movies} />
        </Col>
      </Row>
    </Container>
  )
}
export default connect(mapStateToProps)(MoviesList)
