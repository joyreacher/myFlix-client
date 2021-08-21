import { combineReducers } from 'redux'
import { SET_FILTER, SET_MOVIES, LOGIN, REGISTER } from '../actions/actions'

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
    case REGISTER:
      return [
        ...state,
        {
          username: action.username,
          password: action.password,
          email: action.email,
          birthday: action.birthday
        }
      ]
    default:
      return state
  }
}
// ? COMBINE REDUCERS ABOVE
const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  profile
})

export default moviesApp
