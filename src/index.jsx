import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import moviesApp from './reducers/reducers'
import MainView from './components/main-view/main-view'

// styles
import './index.scss'
import { devToolsEnhancer } from 'redux-devtools-extension'

// setup store AFTER importing MainView and styles
const store = createStore(moviesApp, devToolsEnhancer())

class MyFlixApplication extends React.Component {
  render () {
    return (
      <Provider store={store}>
          <MainView />
      </Provider>
    )
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0]
// Tells React to render your app in the root DOM el
ReactDOM.render(React.createElement(MyFlixApplication), container)
