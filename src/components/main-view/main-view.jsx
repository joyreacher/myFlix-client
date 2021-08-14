import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

import { RegistrationView } from '../registration-view/registration-view'
import { LoginView } from '../login-view/login-view'
import MovieContainer from '../movie-card/movie-container'
import MovieView from '../movie-view/movie-view'
import GenreView from '../genre-view/genre-view'
import DirectorView from '../director-view/director-view'
import ProfileView from '../profile-view/profile-view'
import Loading from '../loading-view/loading-view'
import Navbar from '../navbar/navbar'

// Bootstrap
import Button from 'react-bootstrap/Button'

export default class MainView extends React.Component {
  constructor () {
    super()
    this.state = {
      selectedMovie: null,
      movies: [],
      genre: [],
      directors: [],
      user: null,
      register: false,
      hasError: false
    }
  }

  componentDidMount () {
    const accessToken = localStorage.getItem('token')
    if (accessToken != null) {
      this.setState({
        user: localStorage.getItem('user')
      })
      this.getMovies(accessToken)
    }
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

  onLoggedOut () {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.setState({
      user: null
    })
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

  getMoviesByGenre (movies) {
    const accessToken = localStorage.getItem('token')
    axios.get(`https://cinema-barn.herokuapp.com/genre/${movies}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(res => {
      console.log(res.data)
      // assign the result to state
      this.setState({
        genre: res.data
      })
      // return res.data
    }).catch(function (error) {
      console.log(error)
    })
  }

  onRegister () {
    this.setState({
      register: true
    })
  }

  triggerUpdate (user) {
    window.location.reload()
  }

  render () {
    const { movies, user, genre } = this.state
    return (
      <Router>
        <Navbar onLogOutClick={() => this.onLoggedOut()} user={user} />
        <Route
          exact
          path='/'
          render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            if (movies.length === 0) return <Loading />
            return <MovieContainer movies={movies} />
          }}
        />
        <Route
          exact
          path='/register'
          render={() => {
            if (user) return <Redirect to='/' />
            return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} onRegisterClick={() => this.onLoggedIn()} />
          }}
        />
        <Route
          exact
          path='/movies/:movieId'
          render={({ match, history }) => {
            if (!user) return <Redirect to='/' />
            return <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
          }}
        />
        <Route
          exact
          path='/directors/:name'
          // match and history are objects we can use
          render={({ match, history }) => {
            console.log(match, history)
            if (!genre) return <Loading />
            if (!user) return <Redirect to='/' />
            return <DirectorView movies={movies} name={match.params.name} onBackClick={() => history.goBack()} />
          }}
        />
        <Route
          exact
          path='/genres/:genre'
          render={({ match, history }) => {
            // console.log(match)
            if (!genre) return <Loading />
            if (!user) return <Redirect to='/' />
            return <GenreView movies={movies} genre={match.params.genre} onBackClick={() => history.goBack()} />
          }}
        />
        <Route
          exact
          path='/user/:name'
          render={({ match, history }) => {
            if (!user) return <Redirect to='/' />
            return <ProfileView handleUpdate={() => this.triggerUpdate()} user={user} onLoggedIn={user => this.onLoggedIn(user)} getMovies={user => this.getMovies(user)} />
          }}
        />
      </Router>
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
