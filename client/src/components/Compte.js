import React from 'react';
import '../components/Components.css';

export default class Compte extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      status: this.props.Status,
      email: '',
      password: '',
      modal: false,
      loginname: '',
      loginpassword: '',
      loginlastname: '',
      loginemail: '',
      logindaten: '',
      userData: null
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

  loginName = (loginname) => {
    this.setState({
      loginname: loginname.target.value
    });
    console.log(loginname.target.value)
  }

  loginPassword = (loginpassword) => {
    this.setState({
      loginpassword: loginpassword.target.value
    });
    console.log(loginpassword.target.value)
  }

  loginLastname = (loginlastname) => {
    this.setState({
      loginlastname: loginlastname.target.value
    });
    console.log(loginlastname.target.value)
  }

  loginEmail = (loginemail) => {
    this.setState({
      loginemail: loginemail.target.value
    });
    console.log(loginemail.target.value)
  }

  loginDateN = (logindaten) => {
    this.setState({
      logindaten: logindaten.target.value
    });
    console.log(logindaten.target.value)
  }

  Connect = () => {
    fetch(`/api/login?email=${this.state.email}&password=${this.state.password}`)
    .then(res => res.json())
    .then(list => {
      console.log(list)
      if (list.length > 0) {
        this.props.screenProps.isLoggedIn(list[0])
        this.setState({
          status: "loggedIn",
          userData: list[0]
        })
      } else {
        alert("Erreur de login")
      }
    })
  }

  CreateAcc = () => {
    fetch(`/api/createacc?name=${this.state.loginname}&lastname=${this.state.loginlastname}&email=${this.state.loginemail}&password=${this.state.loginpassword}&type=client&dateN=${this.state.logindaten}`)
    .then(res => res.json())
    .then(compte => {
      if (compte.affectedRows > 0) {
        console.log(compte)
      } else {
        alert("Erreur de login")
      }
    })
  }

  CloseModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

render (){
  if (this.state.status === "logout" || this.state.status === "Erreur de login") {
    return(
    <div className="divLogin">
      <h1>Logged out</h1>
      <input type='email' name='email' placeholder='Email' value={this.state.email} onChange={this.updateEmail}></input>
      <input type='password' name='password' placeholder='Mot de passe' value={this.state.password} onChange={this.updatePassword}></input>
      <div>
      <button onClick={this.Connect}>
        <span>Connexion</span>
      </button>
      <button onClick={this.CloseModal}>
        <span>Inscription</span>
      </button>
      </div>

      {
          this.state.modal && (
            <div className="modalCreate">
                <input name='name' type='text' placeholder='Prénom' value={this.state.loginname} onChange={this.loginName}></input>
                <input name='lastname' type='text' placeholder='Nom' value={this.state.loginlastname} onChange={this.loginLastname}></input>
                <input name='email' type='email' placeholder='Email' value={this.state.loginemail} onChange={this.loginEmail}></input>
                <input name='password' type='password' placeholder='Mot de passe' value={this.state.loginpassword} onChange={this.loginPassword}></input>
                <input name='dateN' type='date' placeholder='Date de naissance' value={this.state.logindaten} onChange={this.loginDateN}></input>
                <button onClick={this.CreateAcc}>
                  <span>Confirmer</span>
                </button>
                <button className="closeModal" onClick={this.CloseModal}>
                  <span>Fermer</span>
                </button>
           </div>
          )
      }
      
      
    </div>
    )
  } else if (this.state.status === "loggedIn") {
    return (
      <div>
          <h1>Logged in</h1>
      </div>
    );
  } 

}
}
