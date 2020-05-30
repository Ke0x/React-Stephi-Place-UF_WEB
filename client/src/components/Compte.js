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
      userData: null,
      nameM: '',
      passwordM: '',
      lastnameM: '',
      emailM: '',
      annonces: []
    }
  }

  componentDidMount() {
    if(this.props.userData) {
      this.setState({
        nameM: this.props.userData.name,
        lastnameM: this.props.userData.lastname,
        emailM: this.props.userData.email,
        passwordM: this.props.userData.password
      })
      this.getUserAnnonce(this.props.userData.iduser);
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

  updateEmailModif = (emailM) => {
    this.setState({
      emailM: emailM.target.value
    });
    console.log(emailM.target.value)
  }

  updateNameModif = (nameM) => {
    this.setState({
      nameM: nameM.target.value
    });
    console.log(nameM.target.value)
  }

  updateLastnameModif = (lastnameM) => {
    this.setState({
      lastnameM: lastnameM.target.value
    });
    console.log(lastnameM.target.value)
  }

  updatePasswordModif = (passwordM) => {
    this.setState({
      passwordM: passwordM.target.value
    });
    console.log(passwordM.target.value)
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
          userData: list[0],
          nameM: list[0].name,
          lastnameM: list[0].lastname,
          emailM: list[0].email,
          passwordM: list[0].password
        })
        this.getUserAnnonce(list[0].iduser)
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
        this.CloseModal()
      } else {
        alert("Erreur")
      }
    })
  }

  saveProfil = () => {
    fetch(`/api/updateprofil?name=${this.state.nameM}&lastname=${this.state.lastnameM}&email=${this.state.emailM}&password=${this.state.passwordM}&id=${this.state.userData.iduser}`)
    .then(res => res.json())
    .then(compte => {
      if (compte.affectedRows > 0) {
        console.log(compte)
        alert("Modifications enregistrées")
      } else {
        alert("Erreur")
      }
    })
  }

  CloseModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  getUserAnnonce = (id) => {
    fetch(`/api/userannonces?id=${id}`)
    .then(res => res.json())
    .then(list => {
      console.log(list)
      if (list.length > 0) {
        this.setState({ annonces: list })
      } else {
        console.log("Aucune annonce")
      }
    })
  }

  clickAnnonce = (id) => {
    console.log(id)
  }

render (){
  const { annonces } = this.state
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
      <>
      <div className='inputControl'>
        <input type="text" className="form-control textCompte" placeholder="Prénom" value={this.state.nameM} onChange={this.updateNameModif}></input>
        <input type="text" className="form-control textCompte" placeholder="Nom" value={this.state.lastnameM} onChange={this.updateLastnameModif}></input>
        <input type="text" className="form-control textCompte" placeholder="Email" value={this.state.emailM} onChange={this.updateEmailModif}></input>
        <input type="password" className="form-control textCompte" placeholder="Mot de passe" value={this.state.passwordM} onChange={this.updatePassword}></input>
        <button type="button" className="btn btn-primary" onClick={this.saveProfil}>Enregistrer</button>
      </div>
      <div className="annonceContainer">
        <span className="textAnnonce">Mes annonces</span>
        <div className="annonceContain">
          <ul key={this.state.annonces} className="list-group">
            {annonces.map(anc =>
              <li key={anc.idannonce} className="list-group-item">{anc.adresse} <a href={'/userannonce/' + anc.idannonce + '/' + this.props.userData.iduser} >Modifier</a></li>
            )}
            {
              !annonces && (
                <span>Aucune annonce</span>
              )
            }
          </ul>
        </div>
        <button type="button" className="btn btn-primary btnAdd" onClick={null}>Ajouter une annonce</button>
      </div>
      </>
    );
  } 

}
}
