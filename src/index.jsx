import React from 'react';
import ReactDOM from 'react-dom';
//styles
import './index.scss';

class MyFlixApplication extends React.Component{
  render(){
    return(
      <div className="my-flix">
        <div Good morning/>
      </div>
    )
  }
}

//Finds the root of your app
const container = document.getElementByClassName('app-container')[0];
//Tells React to render your app in the root DOM el
ReactDOM.render(React.createElement(MyFlixApplication), container);