import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { RegistrationView } from '../registration-view/registration-view'
import { LoginView } from '../login-view/login-view'
import MovieCard from '../movie-card/movie-card'
import MovieView from '../movie-view/movie-view'
import ErrorBoundary from '../ErrorBoundary'
import Loading from '../loading-view/loading-view'

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
    
  }

  setSelectedMovie (newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    })
  }

  onLoggedIn (authData) {
    console.log(authData.user.username)
    this.setState({
      user: authData.user.username,
      register: false
    })
    localStorage.setItem('token', authData.token)
    localStorage.setItem('user', authData.user.username)
    this.getMovies(authData.token)
  }

  getMovies (token) {
    axios.get('https://cinema-barn.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      // assign the result to state
      this.setState({
        movies: res.data
      })
    }).catch(function (error) {
      console.log(error)
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
    if (movies.length === 0) return <Loading />
    return (
      <ErrorBoundary hasError={this.state.hasError}>
        {selectedMovie
          ? (
            <Col>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie) }} />
            </Col>
            )
          : <MovieCard movies={movies} onMovieClick={movie => { this.setSelectedMovie(movie) }} />}
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
