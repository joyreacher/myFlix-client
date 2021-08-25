import { combineReducers } from 'redux'
import { SET_FILTER, SET_MOVIES, LOGIN, REGISTER, UPDATE, LOAD_USER, ADD, REMOVE, LOAD, CANCEL_UPDATE } from '../actions/actions'

/**
 *
  It’s handy here to give a default value to the state parameter (state = '', action).
  If state were to be undefined and the action out of scope for a reducer (in the visibilityFilter reducer,
  if the action wasn’t SET_FILTER),
  the reducer would return whatever it was passed as the visibilityFilter state—in this case, an empty string ''.

  -a reducer must always return a state even if there have been no changes
  -reducers should never mutate the state, they should create a new instance of the state to be returned
    TO ADD A MOVIE TO A LIST
    --copy the movies array then add to it, then return the new array
 */

function visibilityFilter (state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      // return what is passed in the dispatch
      return action.value
    default:
      return state
  }
}

function movies (state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value
    default:
      return state
  }
}

function profile (state = [], action) {
  switch (action.type) {
    case LOGIN:
      return {
        username: action.username
      }
    case UPDATE:
      return {
        ...state,
        update: action.payload
      }
    case CANCEL_UPDATE:
      return {
        ...state,
        update: action.payload
      }
    case REGISTER:
      return {
        username: action.username,
        email: action.email,
        birthday: action.birthday
      }
    default:
      return state
  }
}
const favoriteMovies = {
  movies: []
}
function selectedMovies (state = favoriteMovies, action) {
  switch (action.type) {
    case REMOVE:
      return {
        // ...state,
        movies: state.movies.filter((item, index) => item._id !== action.id)
      }
    case ADD:
      return {
        movies: [...state.movies, action.id]
      }
    case LOAD:
      return {
        movies: action.id
      }
    default:
      return state
  }
}

function user (state = {
  username: '',
  image: '',
  email: '',
  birthday: '',
  favorite_movies: []
}, action) {
  switch (action.type) {
    case LOAD_USER:
      return {
        username: action.username,
        image: action.image,
        email: action.email,
        birthday: action.birthday,
        favorite_movies: action.favoriteMovies
      }
    default:
      return state
  }
}
// ? COMBINE REDUCERS ABOVE
const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  profile,
  user,
  selectedMovies
})

export default moviesApp
