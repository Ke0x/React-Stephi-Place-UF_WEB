import React from 'react';
import '../components/Components.css';
import { Modal } from 'react-bootstrap';


export default class Compte extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      status: this.props.Status,
      email: '',
      password: ''
    }
  }

  updateEmail = (email) => {
    this.setState({
      email: email.target.value
    });
    console.log(email.target.value)
  }

  updatePassword = (password) => {
    this.setState({
      password: password.target.value
    });
    console.log(password.target.value)
  }

  btnClick = () => {
    fetch(`/api/login?email=${this.state.email}&password=${this.state.password}`)
    .then(res => res.json())
    .then(list => {
      if (list.length > 0) {
        this.props.screenProps.isLoggedIn()
        this.setState({
          status: "loggedIn"
        })
      } else {
        alert("Erreur de login")
      }
    })
  }

render (){
  if (this.state.status == "logout" || this.state.status == "Erreur de login") {
    return(
    <div className="divLogin">
      <h1>Logged out</h1>
      <input type='email' placeholder='Email' value={this.state.email} onChange={this.updateEmail}></input>
      <input type='password' placeholder='Mot de passe' value={this.state.password} onChange={this.updatePassword}></input>
      <button onClick={this.btnClick}/>
    </div>
    )
  } else if (this.state.status == "loggedIn") {
    return (
      <div>
          <h1>Logged in</h1>
      </div>
    );
  } 

}
}
