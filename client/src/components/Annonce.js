import React from 'react';
import '../components/Components.css';
import {Button, Card} from 'react-bootstrap';


export default class Annonce extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      image: []
    }
  }

  componentDidMount() {
    this.getImage()
  }

  getImage = () => {
    fetch(`/api/annonceimg?id=${this.props.id}`)
    .then(res => res.json())
    .then(list => {
      if (list.length > 0) {
        this.setState({ image: list[0] })
      } else {
      }
    })
  }

render (){
  return (
    <Button className="annonceCard" href={'/annonce/' + this.props.id}>
        <img className="imageCard" src={this.state.image && this.state.image.photo} />
        <div className="cardtextcontainer">
          <span className="cardtext">{this.props.data.description}</span>
          <span className="cardtext">Prix: {this.props.data.prix} €</span>
          <span className="cardtext">Ville: {this.props.data.ville}</span>
        </div>
    </Button>
  );
}
}
