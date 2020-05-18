import React from 'react';

import '../components/Components.css';
import { Navbar } from 'react-bootstrap';

import logo from './svg/logo.svg';
import heart from './svg/heart.svg';
import message from './svg/message.svg'
import user from './svg/user.svg'

import {
  Link
} from "react-router-dom";

export default class Navbars extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      
    }
  }

render (){
  return (
    <>
    <Navbar sticky="top" bg="dark" variant="dark">
    <Navbar.Brand>
      <Link to="/home">
      <img
        alt="logo"
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      Stephi Place
      </Link>
    </Navbar.Brand>
    <div className="navButton">
    <Link to="/favoris" className="divlogo">
      <img
        alt="heart_logo"
        src={heart}
        width="24"
        height="24"
        className="d-inline-block align-top"
        />{' '}
      <span>Favoris</span>
      <div className="bottomIndicator" />
    </Link>
    <Link to="/compte" className="divlogo">
      <img
        alt="user_logo"
        src={user}
        width="24"
        height="24"
        className="d-inline-block align-top"
        />{' '}
      <span>Compte</span>
      <div className="bottomIndicator" />
    </Link>
    </div>
  </Navbar>
</>
  );
}
}
