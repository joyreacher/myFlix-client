import React from 'react'
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
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
import Button from 'react-bootstrap/Button'

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
    //! persistant data
    // get token
    const accessToken = localStorage.getItem('token')
    // if accessToken is not set
    if (accessToken != null) {
      // set the user state to what is in the localstorage labeled 'user'
      this.setState({
        user: localStorage.getItem('user')
      })
      // get movies with token in localStorage : 'token'
      this.getMovies(accessToken)
    }
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

  onRegister () {
    this.setState({
      register: true
    })
  }

  render () {
    const { movies, selectedMovie, user, register } = this.state
    // if (register) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} onRegisterClick={() => this.onLoggedIn()} />
    // if (!user) return <LoginView onRegisterClick={() => this.onRegister()} onLoggedIn={user => this.onLoggedIn(user)} />
    // if (movies.length === 0) return <Loading />
    return (
      <ErrorBoundary hasError={this.state.hasError}>
        <Router>
          <Button onClick={() => this.onLoggedOut()}>Logout</Button>
          <Route
            exact
            path='/'
            render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              if (movies.length === 0) return <Loading />
              return <MovieCard movies={movies} />
            }}/>
          <Route
            exact
            path='/register'
            render={() => {
              if (user) return <Redirect to='/' />
              return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} onRegisterClick={() => this.onLoggedIn()} />
            }}/>
          <Route
            exact
            path='/movies/:movieId'
            render={({ match, history }) => {
              if(!user) return <LoginView onLoggedin={user => this.onLoggedIn(user)} />
              return <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            }}
          />
          <Route
            exact
            path='/directors/:name'
            // match and history are objects we can use
            render={({ match, history }) => {
              console.log(match, history)
              if (!user) return <LoginView onLoggedin={user => this.onLoggedIn(user)} />
              return <>build director view</>
            }}
          />
          <Route
            exact
            path='/genres/:name'
            render={({ match, history }) => {
              if(!user) return <LoginView onLoggedin={user => this.onLoggedIn(user)} />
              return <>build genre view</>
            }}
          />
        </Router>
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
