import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { RegistrationView } from '../registration-view/registration-view'
import { LoginView } from '../login-view/login-view'
import MovieCard from '../movie-card/movie-card'
import MovieView from '../movie-view/movie-view'
import ErrorBoundary from '../ErrorBoundary'

// Bootstrap
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class MainView extends React.Component {
  constructor () {
    super()
    this.state = {
      selectedMovie: null,
      movies: [],
      user: null,
      register: false,
      hasError: false
    }
  }

  componentDidMount () {
    axios.get('https://cinema-barn.herokuapp.com/movies')
      .then((res) => {
        this.setState({
          movies: res.data
        })
      })
      .catch(error => {
        this.setState({
          hasError: true
        })
        console.log(error)
      })
  }

  setSelectedMovie (newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    })
  }

  onLoggedIn (user) {
    this.setState({
      user: user,
      register: false
    })
  }

  onRegister () {
    this.setState({
      register: true
    })
  }

  render () {
    const { movies, selectedMovie, user, register } = this.state
    if (register) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} onRegisterClick={() => this.onLoggedIn()} />
    if (!user) return <LoginView onRegisterClick={() => this.onRegister()} onLoggedIn={user => this.onLoggedIn(user)} />
    return (
      <ErrorBoundary hasError={this.state.hasError}>
        <Row className='main-view justify-content-lg-center'>
          {selectedMovie
            ? (
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie) }} />
              </Col>
              )
            : movies.map(movie => (  
              <Col key={movie._id} md={6} lg={4}>
                <MovieCard movie={movie} onMovieClick={movie => { this.setSelectedMovie(movie) }} />
              </Col>
            ))}
        </Row>
      </ErrorBoundary>
    )
  }
}

MainView.propTypes = {
  movies: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      DOB: PropTypes.string.isRequired,
      YOD: PropTypes.string.isRequired
    }).isRequired
  }),
  selectedMovie: PropTypes.string,
  user: PropTypes.string,
  register: PropTypes.bool
}
