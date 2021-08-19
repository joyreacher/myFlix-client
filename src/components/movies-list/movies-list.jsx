import React from 'react'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'

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
  return filteredMovies.map(m => (
    <Col md={3} key={m._id}>
      <CardList movie={m}/>
    </Col>
  ))
}
export default connect(mapStateToProps)(MoviesList)
