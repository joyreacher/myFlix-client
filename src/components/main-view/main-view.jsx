import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'
import { connect } from 'react-redux'

import { login, setMovies, image, updateProfile, updatedProfile, loadUser } from '../../actions/actions'
import MoviesList from '../movies-list/movies-list'

import RegistrationView from '../registration-view/registration-view'
import LoginView from '../login-view/login-view'
import MovieView from '../movie-view/movie-view'
import GenreView from '../genre-view/genre-view'
import DirectorView from '../director-view/director-view'
import MainContainer from '../containers/main-container'
import Loading from '../loading-view/loading-view'
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'

import './main-view.scss'
import { Container, Row, Col } from 'react-bootstrap'
import ErrorBoundary from '../ErrorBoundary'
import ProfileView from '../profile/profile-view'
import ProfileUpdate from '../profile/profile-update'
class MainView extends React.Component {
  constructor () {
    super()
    this.state = {
      selectedMovie: null,
      genre: [],
      directors: [],
      register: false,
      hasError: false,
      updateProfile: false
    }
  }

  componentDidMount () {
    const accessToken = localStorage.getItem('token')
    if (accessToken != null) {
      this.props.login(localStorage.getItem('user'))
      this.getMovies(accessToken)
    }
  }

  onLoggedIn (authData) {
    this.props.login(authData.user.username)
    localStorage.setItem('token', authData.token)
    localStorage.setItem('user', authData.user.username)
    this.getMovies(authData.token)
  }

  onLoggedOut () {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('image')
    this.props.login('')
  }

  getMovies (token) {
    if (!token) {
      token = localStorage.getItem('token')
      axios.get('https://cinema-barn.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        this.props.setMovies(res.data)
        return axios.get('https://randomuser.me/api/?results=1')
      }).then(res => {
        this.props.image(res.data.results[0].picture.large)
      }).catch(function (error) {
        console.log(error)
      })
    } else {
      axios.get('https://cinema-barn.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        this.props.setMovies(res.data)
        return axios.get('https://randomuser.me/api/?results=1')
      }).then(res => {
        this.props.image(res.data.results[0].picture.large)
      }).catch(function (error) {
        console.log(error)
      })
    }
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

  handleUpdate () {
    this.setState({
      updateProfile: true
    })
  }
  
  cancelUpdate () {
    this.setState({
      updateProfile: false
    })
  }

  render () {
    const { movies, genre, user, profile, isLoggedIn, loadImage, update, updateProfile, updatedUser } = this.props
    return (
      <Router>
        <ErrorBoundary logout={(e) => this.onLoggedOut(e)}>
        <Navbar onLogOutClick={() => this.onLoggedOut()} user={profile} />
        <Container>
          <Route
            exact
            path='/'
            render={() => {
              if (!localStorage.getItem('token')) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              if (!loadImage.image) return <Loading />
              
              return (
                <MainContainer title='Home'>
                  <MoviesList movies={movies} />
                </MainContainer>
              )
            }}
          />
          <Route
            exact
            path='/register'
            render={() => {
              // if (user) return <Redirect to='/' />
              return (
                <MainContainer title='Register'>
                  <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} onRegisterClick={() => this.triggerUpdate()} />
                </MainContainer>
              )
            }}
          />
          <Route
            exact
            path='/movies/:movieId'
            render={({ match, history }) => {
              if (!profile.username) return <Redirect to='/' />
              let movieTitle = movies.find(m => m._id === match.params.movieId).Title
              return (
                <MainContainer title={movieTitle}>
                  <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                </MainContainer>
              )
            }}
          />
          <Route
            exact
            path='/directors/:name'
            // match and history are objects we can use
            // to pull data from path/request
            render={({ match, history }) => {
              if (!movies) return <Loading />
              if (!profile.username) return <Redirect to='/' />
              return (
                <MainContainer title='Directors'>
                  <DirectorView movies={movies} name={match.params.name} onBackClick={() => history.goBack()} />
                </MainContainer>
              )
            }}
          />
          <Route
            exact
            path='/genres/:genre'
            render={({ match, history }) => {
              if (!movies) return <Loading />
              if (!profile.username) return <Redirect to='/' />
              return (
                <MainContainer title='Genre'>
                  <GenreView movies={movies} genre={match.params.genre} onBackClick={() => history.goBack()} />
                </MainContainer>
              )
            }}
          />
          <Route
            exact
            path='/user/:name'
            render={({ match, history }) => {
              if (!profile.username) return <Redirect to='/' />
              return (
                <MainContainer title={profile.username}>
                  {
                    !this.state.updateProfile
                    ? <Container>
                    <div className='update update-container'>
                      <button className='btn btn-outline-dark custom-btn' onClick={() => this.handleUpdate()}>Update Profile</button>
                    </div>
                    
                    <ProfileView 
                    handleUpdate={() => this.triggerUpdate()} 
                    user={user}
                    movies={movies} 
                    profile={profile}
                    updateProfile={updateProfile}
                    loadImage={loadImage}
                    onLoggedIn={user => this.onLoggedIn(user)} 
                    getMovies={user => this.getMovies(user)} 
                    loadUser={this.props.loadUser}
                    updatedUser={updatedUser}
                    />
                    
                    </Container>
                    : <Container>
                    <Row>
                      
                    </Row>
                    <div className='update update-container'>
                      <button className='btn btn-outline-dark custom-btn' onClick={() => this.handleUpdate()}>Delete Profile</button>
                      <button className='btn btn-outline-dark custom-btn' onClick={() => this.cancelUpdate()}>Cancel Update</button>
                    </div>
                    <ProfileUpdate
                      loadUser={this.props.loadUser}
                      loadImage={loadImage}
                      user={user}
                      profile={profile}
                      updatedProfile={() => updatedProfile()}
                      updateProfile={updateProfile}
                      cancelUpdate={() => this.setState({updateProfile: false})}
                    />
                    
                    </Container>
                  }
                </MainContainer>
                )
            }}
          />
        </Container>
        </ErrorBoundary>
        {!localStorage.getItem('user') ? '' : <Footer user={profile} />}
      </Router>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies,
    profile: state.profile,
    isLoggedIn: state.profile,
    loadImage: state.loadImage,
    updatedUser: state.updatedUser
  }
}
export default connect(mapStateToProps, { setMovies, login, image, updateProfile, loadUser })(MainView)
MainView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
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
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
    }).isRequired
  })),
  selectedMovie: PropTypes.string,
  user: PropTypes.object,
  register: PropTypes.bool
}
