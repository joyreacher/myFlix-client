export const SET_MOVIES = 'SET_MOVIES'
export const SET_FILTER = 'SET_FILTER'
export const LOGIN = 'LOGIN'
export const REGISTER = 'REGISTER'


export const setMovies = (value) => ({
  type: SET_MOVIES,
  value
})

export const setFilter = (value) => ({
  type: SET_FILTER,
  value
})

export const login = (username, password) => ({
  type: LOGIN,
  username,
  password
})

export const register = (username, password, email, birthday) => ({
  type: REGISTER,
  username,
  password,
  email,
  birthday
})