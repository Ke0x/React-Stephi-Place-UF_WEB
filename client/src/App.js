import React from 'react';
import './App.css';
import Home from './components/Home';
import Navbars from './components/Navbars';

import Favoris from './components/Favoris';
import Compte from './components/Compte';
import InfoAnnonce  from './components/InfoAnnonce'
import UserAnnonce  from './components/UserAnnonce'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      agence: [],
      status: "logout",
      userData: null,
      id: 1
    }
  }

  componentDidMount() {
    this.getAgence();
    console.log(this.state.status)
  }

  getAgence = () => {
    fetch('/api/agence')
    .then(res => res.json())
    .then(list => this.setState({ agence: list, id: list[0].idagence }))
  }

  idChange = (id) => {
    this.setState({
      id: id.target.value
    });
    console.log(id.target.value)
  }

render (){
  const { userData, agence, value } = this.state;
  return (
    <Router>
      <Navbars />
      <select id="agence" onChange={this.idChange} value={value}>
        {agence.map(agc =>
          <option key={agc.idagence} value={agc.idagence}>{agc.nom}</option>
        )};
      </select>
      <Switch>
          <Redirect exact from="/" to="home" />
          <Route exact path="/home">
            <Home key={this.state.id} agence={this.state.id} />
          </Route>
          <Route exact path="/favoris">
            <Favoris Status={this.state.status}/>
          </Route>
          <Route exact path="/compte">
            <Compte userData={this.state.userData} screenProps={{ isLoggedIn: (data) => this.setState({ status: 'loggedIn', userData: data }) }} Status={this.state.status} />
          </Route>
          <Route exact path='/annonce/:id' render={(matchProps) =>
            <InfoAnnonce
              {...matchProps}
              {...this.props}
            />
          }/>
          <Route exact path='/userannonce/:userid/:id' render={(matchProps) =>
            <UserAnnonce
              {...matchProps}
              {...this.props}
            />
          }/>
        </Switch>
    </Router>
  );
}
}
