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
    <Card className="Card">
        <Card.Img variant="top" src={this.state.image && this.state.image.photo} />
        <Card.Body>
        <Card.Title>{this.props.id}</Card.Title>
        <Card.Text>
        {this.props.ville}
        </Card.Text>
        <Button variant="primary" href={'/annonce/' + this.props.id}>Go somewhere</Button>
        </Card.Body>
    </Card>
  );
}
}
