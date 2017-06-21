import React, { Component } from 'react';
import './masthead.css';
import logo from './logo.svg';

class Masthead extends Component {
  render() {
    return (
      <header className="masthead" role="banner">
        <div className="masthead__container">
          <img className="masthead__logo" src={logo} alt="logo" />
        </div>
      </header>
    );
  }
}

export default Masthead;