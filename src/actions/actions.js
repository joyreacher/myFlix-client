export const SET_MOVIES = 'SET_MOVIES'
export const SET_FILTER = 'SET_FILTER'
export const LOGIN = 'LOGIN'
export const REGISTER = 'REGISTER'
export const UPDATE = 'UPDATE'
export const LOAD_USER = 'LOAD_USER'
export const ADD_MOVIE = 'ADD_MOVIE'


export const setMovies = (value) => ({
  type: SET_MOVIES,
  value
})

export const setFilter = (value) => ({
  type: SET_FILTER,
  value
})

export const login = (username) => ({
  type: LOGIN,
  username
})

export const register = (username, email, birthday) => ({
  type: REGISTER,
  username,
  email,
  birthday
})

export const updateProfile = (value) => ({
  type: UPDATE,
  payload: value
})

export const loadUser = (username, image, email, birthday, favoriteMovies) => ({
  type: LOAD_USER,
  username,
  image,
  email,
  birthday,
  favoriteMovies
})

export const addMovie = (id) => ({
  type: ADD_MOVIE,
  id
})