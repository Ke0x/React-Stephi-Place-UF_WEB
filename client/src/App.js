import React from 'react';
import './App.css';
import Home from './components/Home';
import Navbars from './components/Navbars';

import Favoris from './components/Favoris';
import Compte from './components/Compte';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      list: [],
      status: "logout"
    }
  }

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    fetch('/api/user')
    .then(res => res.json())
    .then(list => this.setState({ list }))
  }

render (){
  const { list } = this.state;
  return (
    <Router>
      <Navbars />
        <h1>{this.state.status}</h1>
      <Switch>
          <Redirect exact from="/" to="home" />
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/favoris">
            <Favoris />
          </Route>
          <Route path="/compte">
            <Compte screenProps={{ isLoggedIn: () => this.setState({ status: 'loggedIn' }) }} Status={this.state.status} />
          </Route>
        </Switch>
    </Router>
  );
}
}
