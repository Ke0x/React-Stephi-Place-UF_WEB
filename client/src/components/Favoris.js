import React from 'react';
import '../components/Components.css';



export default class Favoris extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      status: this.props.Status,
    }
  }

  render (){
    if (this.state.status === "logout" || this.state.status === "Erreur de login") {
      return(
        <div className='msgConnect'>
          <h1>Veuillez vous <a href='compte'>connecter</a> pour accéder à vos favoris </h1>
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
